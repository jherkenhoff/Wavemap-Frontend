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
            left: 40,
            right: 20,
            bottom: 30
        }

        this.brushHeight = 30
        this.padding = 30
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
        const brushHeight = this.brushHeight
        const padding = this.padding

        // bounds
        const width = parentWidth
        const height = parentHeight
        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;
        const plotYMax = yMax - brushHeight - padding;

        // Find extrema
        const minMag = min(data, yData)
        const maxMag = max(data, yData)

        // scales
        const xScale = scaleLog({
          range: [0, xMax],
          domain: extent(data, xData)
        });
        const plotYScale = scaleLinear({
          range: [plotYMax, 0],
          domain: [minMag, maxMag],
          nice: true
        });
        const brushYScale = scaleLinear({
          range: [brushHeight, 0],
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
                        from="#fff"
                        to="#fff"
                        fromOpacity={0.2}
                        toOpacity={0.0}
                        />
                    <PatternLines
                        id="dLines"
                        height={6}
                        width={6}
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth={1}
                        orientation={['diagonal']}
                        />

                    <Group top={margin.top}>
                        <GridRows
                            width={width}
                            height={plotYMax}
                            scale={plotYScale}
                            stroke="rgba(255,255,255,0.2)"
                            />
                        <Group left={margin.left}>
                            <GridColumns
                                width={width}
                                height={plotYMax}
                                scale={xScale}
                                stroke="rgba(255,255,255,0.1)"
                                />
                            <AreaClosed
                                stroke="transparent"
                                data={data}
                                x={d => xScale(xData(d))}
                                y={d => plotYScale(yData(d))}
                                yScale={plotYScale}
                                fill="url(#fill)"
                                />
                            <AreaClosed
                                stroke="transparent"
                                data={data}
                                x={d => xScale(xData(d))}
                                y={d => plotYScale(yData(d))}
                                yScale={plotYScale}
                                fill="url(#dLines)"
                                />
                            <LinePath
                                data={data}
                                x={d => xScale(xData(d))}
                                y={d => plotYScale(yData(d))}
                                yScale={plotYScale}
                                stroke="#FFF"
                                strokeOpacity="1"
                                strokeWidth={1}
                                />
                            <AxisBottom
                                scale={xScale}
                                top={plotYMax}
                                tickFormat={xFormatter}
                                stroke="rgba(255,255,255,0.5)"
                                tickStroke="rgba(255,255,255,0.5)"
                                tickLabelProps={(value, index) => ({
                                        fill: "white",
                                        fillOpacity: 0.8,
                                        fontSize: 12,
                                        textAnchor: 'middle'

                                    })}
                                />
                            <text x={xMax-5} y={plotYMax-5} fontSize={10} textAnchor="end" fill="white">
                                Frequency / Hz &rarr;
                            </text>

                            <AxisLeft
                                hideTicks
                                hideAxisLine
                                scale={plotYScale}
                                tickLabelProps={(value, index) => ({
                                        fill: "white",
                                        fillOpacity: 0.8,
                                        fontSize: 12,
                                        textAnchor: 'end'

                                    })}
                                />
                            <text x={-5} y={15} transform="rotate(-90)" fontSize={10} textAnchor="end" fill="white">
                                RF Power / dBm &rarr;
                            </text>



                            <Bar
                                x={0}
                                y={0}
                                width={xMax}
                                height={plotYMax}
                                fill="transparent"
                                rx={14}
                                data={data}
                                onTouchStart={event =>
                                    this.handleTooltip({
                                        event,
                                        xData,
                                        xScale,
                                        yScale: plotYScale,
                                        data
                                    })
                                }
                                onTouchMove={event =>
                                    this.handleTooltip({
                                        event,
                                        xData,
                                        xScale,
                                        yScale: plotYScale,
                                        data
                                    })
                                }
                                onMouseMove={event =>
                                    this.handleTooltip({
                                        event,
                                        xData,
                                        xScale,
                                        yScale: plotYScale,
                                        data: data
                                    })
                                }
                                onMouseLeave={event => hideTooltip()}
                                />
                        </Group>
                    </Group>

                    <Group top={height-margin.bottom-brushHeight}>
                        <Group left={margin.left}>
                            <AreaClosed
                                stroke="transparent"
                                data={data}
                                x={d => xScale(xData(d))}
                                y={d => brushYScale(yData(d))}
                                yScale={brushYScale}
                                fill="url(#fill)"
                                />
                            <AreaClosed
                                stroke="transparent"
                                data={data}
                                x={d => xScale(xData(d))}
                                y={d => brushYScale(yData(d))}
                                yScale={brushYScale}
                                fill="url(#dLines)"
                                />
                            <LinePath
                                data={data}
                                x={d => xScale(xData(d))}
                                y={d => brushYScale(yData(d))}
                                yScale={brushYScale}
                                stroke="#FFF"
                                strokeOpacity="1"
                                strokeWidth={1}
                                />
                            <AxisBottom
                                scale={xScale}
                                top={brushHeight}
                                tickFormat={xFormatter}
                                stroke="rgba(255,255,255,0.5)"
                                tickStroke="rgba(255,255,255,0.5)"
                                tickLabelProps={(value, index) => ({
                                        fill: "white",
                                        fillOpacity: 0.8,
                                        fontSize: 12,
                                        textAnchor: 'middle'

                                    })}
                                />
                        </Group>
                    </Group>




                    {tooltipData && (
                        <Group top={margin.top}>
                            <Line
                                from={{ x: tooltipLeft, y: 0 }}
                                to={{ x: tooltipLeft, y: plotYMax }}
                                stroke="#fff"
                                strokeWidth={1}
                                style={{ pointerEvents: 'none' }}
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
                            top={plotYMax - 14 + this.margin.top}
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
