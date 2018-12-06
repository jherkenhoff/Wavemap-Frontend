import React from 'react';
import { AreaClosed, LinePath, Line, Bar } from '@vx/shape';
import { appleStock } from '@vx/mock-data';
import { curveMonotoneX } from '@vx/curve';
import { GridRows, GridColumns } from '@vx/grid';
import { scaleLog, scaleLinear } from '@vx/scale';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { Group } from '@vx/group';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { withParentSize } from '@vx/responsive';
import { LinearGradient } from '@vx/gradient';
import { PatternLines } from '@vx/pattern';
import { localPoint } from '@vx/event';
import { bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';

const stock = appleStock.slice(800);

// util
const min = (arr, fn) => Math.min(...arr.map(fn));
const max = (arr, fn) => Math.max(...arr.map(fn));
const extent = (arr, fn) => [min(arr, fn), max(arr, fn)];

// accessors
const xData = d => d.freq;
const yData = d => d.mag;
const bisectFreq = bisector(d => d.freq).left;

// Formatter
function formatSiPrefix(num) {
    if (num >= 1e9) { return (num/1e9).toFixed(2) + " GHz" }
    else if (num >= 1e6) { return (num/1e6).toFixed(2) + " MHz" }
    else if (num >= 1e3) { return (num/1e3).toFixed(2) + " kHz" }
    else { return num.toFixed(2) + " Hz" }
}

class Area extends React.Component {
    constructor(props) {
        super(props);
        this.handleTooltip = this.handleTooltip.bind(this);

        this.margin = {
            top: 20,
            left: 45,
            right: 20,
            bottom: 45
        }
    }

    handleTooltip({ event, data, xData, xScale, yScale }) {
        const { showTooltip } = this.props;
        const { x } = localPoint(event);
        const x0 = xScale.invert(x-this.margin.left);
        const index = bisectFreq(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;
        if (d1 && d1.mag) {
            d = x0 - xData(d0.mag) > xData(d1.mag) - x0 ? d1 : d0;
        }
        showTooltip({
            tooltipData: d,
            tooltipLeft: x,
            tooltipTop: yScale(d.mag)
        });
    }

    render() {
        const {
            data,
            parentWidth,
            parentHeight,
            tooltipData,
            tooltipLeft,
            tooltipTop,
            showTooltip,
            hideTooltip
        } = this.props;

        const margin = this.margin

        // bounds
        const width = parentWidth
        const height = 300
        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;

        // Find extrema
        const minMag = min(data, yData)
        const maxMag = max(data, yData)

        // scales
        const xScale = scaleLog({
          range: [0, xMax],
          domain: extent(data, xData)
        });
        const yScale = scaleLinear({
          range: [yMax, 0],
          domain: [minMag, maxMag],
          nice: true
        });

        // Formatter
        let xFormatter = xScale.tickFormat(0, ".0s")

        return (
            <div>
                <svg ref={s => (this.svg = s)} width={width} height={height}>
                    <LinearGradient
                        id="fill"
                        from="#122549"
                        to="#b4fbde"
                        fromOpacity={0.8}
                        toOpacity={0.8}
                        />
                    <Group top={margin.top} left={margin.left}>
                        <GridRows
                            lineStyle={{ pointerEvents: 'none' }}
                            scale={yScale}
                            width={xMax}
                            stroke="rgba(0,0,0,0.2)"
                            />
                        <GridColumns
                            lineStyle={{ pointerEvents: 'none' }}
                            scale={xScale}
                            height={yMax}
                            stroke="rgba(0,0,0,0.2)"
                            />
                        <AreaClosed
                            stroke="transparent"
                            data={data}
                            x={d => xScale(xData(d))}
                            y={d => yScale(yData(d))}
                            yScale={yScale}
                            fill="url(#fill)"
                            />

                        <AxisBottom
                            scale={xScale}
                            top={yMax}
                            label="Frequency in Hz"
                            tickFormat={xFormatter}
                            stroke="#333333"
                            tickStroke="#333333"
                            />
                        <AxisLeft
                            scale={yScale}
                            label="RF Power in dBm"
                            labelProps={{ fontSize: 12, fill: 'black' }}
                            />


                        <Bar
                            x={0}
                            y={0}
                            width={xMax}
                            height={yMax}
                            fill="transparent"
                            rx={14}
                            data={data}
                            onTouchStart={event =>
                                this.handleTooltip({
                                    event,
                                    xData,
                                    xScale,
                                    yScale,
                                    data: data
                                })
                            }
                            onTouchMove={event =>
                                this.handleTooltip({
                                    event,
                                    xData,
                                    xScale,
                                    yScale,
                                    data: data
                                })
                            }
                            onMouseMove={event =>
                                this.handleTooltip({
                                    event,
                                    xData,
                                    xScale,
                                    yScale,
                                    data: data
                                })
                            }
                            onMouseLeave={event => hideTooltip()}
                            />

                            <Line
                                from={{ x: 0, y: yScale(maxMag) }}
                                to={{ x: xMax, y: yScale(maxMag) }}
                                stroke="rgba(92, 119, 235, 1.000)"
                                strokeWidth={2}
                                strokeDasharray="2,2"
                                />
                    </Group>




                    {tooltipData && (
                        <Group top={margin.top}>
                            <Line
                                from={{ x: tooltipLeft, y: 0 }}
                                to={{ x: tooltipLeft, y: yMax }}
                                stroke="rgba(92, 119, 235, 1.000)"
                                strokeWidth={2}
                                style={{ pointerEvents: 'none' }}
                                strokeDasharray="2,2"
                                />
                            <circle
                                cx={tooltipLeft}
                                cy={tooltipTop + 1}
                                r={4}
                                fill="black"
                                fillOpacity={0.1}
                                stroke="black"
                                strokeOpacity={0.1}
                                strokeWidth={2}
                                style={{ pointerEvents: 'none' }}
                                />
                            <circle
                                cx={tooltipLeft}
                                cy={tooltipTop}
                                r={4}
                                fill="rgba(92, 119, 235, 1.000)"
                                stroke="white"
                                strokeWidth={2}
                                style={{ pointerEvents: 'none' }}
                                />
                        </Group>
                    )}

                </svg>

                {tooltipData && (
                    <div>
                        <Tooltip
                            top={tooltipTop - 12 + this.margin.top}
                            left={tooltipLeft + 12}
                            style={{
                                    backgroundColor: 'rgba(92, 119, 235, 1.000)',
                                    color: 'white'
                                }}
                            >
                            {`${yData(tooltipData).toFixed(2)} dBm`}
                        </Tooltip>
                        <Tooltip
                            top={yMax - 14 + this.margin.top}
                            left={tooltipLeft}
                            style={{
                                transform: 'translateX(-50%)'
                            }}
                            >
                            {formatSiPrefix(xData(tooltipData))}
                        </Tooltip>
                    </div>
                )}
            </div>
        );
    }
}

export default withParentSize(withTooltip(Area));
