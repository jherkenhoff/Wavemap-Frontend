import React from 'react';
import { AreaClosed, LinePath, Line, Bar } from '@vx/shape';
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

// Util
const min = (arr, fn) => Math.min(...arr.map(fn));
const max = (arr, fn) => Math.max(...arr.map(fn));

// Accessors
const getFreq = d => d.freq;
const getMag = d => d.mag;
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

    handleTooltip({ event, spectrum, getFreq, xScale, yScale }) {
        const { showTooltip } = this.props;
        const { x } = localPoint(event);
        const x0 = xScale.invert(x-this.margin.left);
        const index = bisectFreq(spectrum, x0, 1);
        const d0 = spectrum[index - 1];
        const d1 = spectrum[index];
        let d = d0;
        if (d1 && d1.mag) {
            d = x0 - getFreq(d0.mag) > getFreq(d1.mag) - x0 ? d1 : d0;
        }
        showTooltip({
            tooltipData: d,
            tooltipLeft: x,
            tooltipTop: yScale(d.mag)
        });
    }

    render() {
        const {
            spectrum,
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
        let extrema = {}
        if (spectrum == undefined) {
            extrema.minMag = -80
            extrema.maxMag = -20
            extrema.minFreq = 1e6
            extrema.maxFreq = 1e9
        } else {
            extrema.minMag = min(spectrum, getMag)
            extrema.maxMag = max(spectrum, getMag)
            extrema.minFreq = min(spectrum, getFreq)
            extrema.maxFreq = max(spectrum, getFreq)
        }

        // scales
        const xScale = scaleLog({
          range: [0, xMax],
          domain: [extrema.minFreq, extrema.maxFreq]
        });
        const plotYScale = scaleLinear({
          range: [plotYMax, 0],
          domain: [extrema.minMag, extrema.maxMag],
          nice: true
        });
        const brushYScale = scaleLinear({
          range: [brushHeight, 0],
          domain: [extrema.minMag, extrema.maxMag],
          nice: true
        });

        // Formatter
        let xFormatter = xScale.tickFormat(0, ".0s")

        const mainPlot = (
            <>
                <AreaClosed
                    stroke="transparent"
                    data={spectrum}
                    x={d => xScale(getFreq(d))}
                    y={d => plotYScale(getMag(d))}
                    yScale={plotYScale}
                    fill="url(#fill)"
                    />
                <AreaClosed
                    stroke="transparent"
                    data={spectrum}
                    x={d => xScale(getFreq(d))}
                    y={d => plotYScale(getMag(d))}
                    yScale={plotYScale}
                    fill="url(#dLines)"
                    />
                <LinePath
                    data={spectrum}
                    x={d => xScale(getFreq(d))}
                    y={d => plotYScale(getMag(d))}
                    stroke="#FFF"
                    strokeOpacity="1"
                    strokeWidth={1}
                    />
                <Line
                    from={{ x: 0, y: plotYScale(extrema.maxMag) }}
                    to={{ x: xMax, y: plotYScale(extrema.maxMag) }}
                    stroke="#fff"
                    strokeDasharray="4"
                    strokeWidth={1}
                    style={{ pointerEvents: 'none' }}
                    />
            </>
        )

        const brushPlot = (
            <>
                <AreaClosed
                    stroke="transparent"
                    data={spectrum}
                    x={d => xScale(getFreq(d))}
                    y={d => brushYScale(getMag(d))}
                    yScale={brushYScale}
                    fill="url(#fill)"
                    />
                <AreaClosed
                    stroke="transparent"
                    data={spectrum}
                    x={d => xScale(getFreq(d))}
                    y={d => brushYScale(getMag(d))}
                    yScale={brushYScale}
                    fill="url(#dLines)"
                    />
                <LinePath
                    data={spectrum}
                    x={d => xScale(getFreq(d))}
                    y={d => brushYScale(getMag(d))}
                    stroke="#FFF"
                    strokeOpacity="1"
                    strokeWidth={1}
                    />
            </>
        )

        const emptyMessage = (
            <text
                x={xMax/2}
                y={plotYMax/2}
                textAnchor="middle"
                fontSize={20}
                fill="white"
                >
                Set marker on map

            </text>
        )

        return (
            <div>
                <svg ref={s => (this.svg = s)} width={width} height={height}>
                    <LinearGradient
                        id="fill"
                        from="#fff"
                        to="#fff"
                        fromOpacity={0.4}
                        toOpacity={0.1}
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
                        <Group left={margin.left}>
                            <GridRows
                                width={xMax}
                                height={plotYMax}
                                scale={plotYScale}
                                stroke="rgba(255,255,255,0.2)"
                                />
                            <GridColumns
                                width={xMax}
                                height={plotYMax}
                                scale={xScale}
                                stroke="rgba(255,255,255,0.2)"
                                />
                            {spectrum!=undefined? mainPlot:undefined}
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

                            <AxisLeft
                                scale={plotYScale}
                                stroke="rgba(255,255,255,0.5)"
                                tickStroke="rgba(255,255,255,0.5)"
                                tickLabelProps={(value, index) => ({
                                        fill: "white",
                                        fillOpacity: 0.8,
                                        fontSize: 12,
                                        textAnchor: 'end'

                                    })}
                                />

                            {spectrum == undefined? emptyMessage:undefined}



                            {spectrum == undefined? undefined:<Bar
                                x={0}
                                y={0}
                                width={xMax}
                                height={plotYMax}
                                fill="transparent"
                                rx={14}
                                data={spectrum}
                                onTouchStart={event =>
                                    this.handleTooltip({
                                        event,
                                        getFreq,
                                        xScale,
                                        yScale: plotYScale,
                                        spectrum
                                    })
                                }
                                onTouchMove={event =>
                                    this.handleTooltip({
                                        event,
                                        getFreq,
                                        xScale,
                                        yScale: plotYScale,
                                        spectrum
                                    })
                                }
                                onMouseMove={event =>
                                    this.handleTooltip({
                                        event,
                                        getFreq,
                                        xScale,
                                        yScale: plotYScale,
                                        spectrum: spectrum
                                    })
                                }
                                onMouseLeave={event => hideTooltip()}
                                />
                            }
                        </Group>
                    </Group>

                    <Group top={height-margin.bottom-brushHeight}>
                        <Group left={margin.left}>
                            {spectrum!=undefined? brushPlot:undefined}
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
                                    backgroundColor: "#333",
                                    color: 'white'
                                }}
                            >
                            {`${getMag(tooltipData).toFixed(2)} dBm`}
                        </Tooltip>
                        <Tooltip
                            top={plotYMax - 14 + this.margin.top}
                            left={tooltipLeft}
                            style={{
                                color: "white",
                                backgroundColor: "#333",
                                transform: 'translateX(-50%)'
                            }}
                            >
                            {formatSiPrefix(getFreq(tooltipData))}
                        </Tooltip>
                    </div>
                )}
            </div>
        );
    }
}

export default withParentSize(withTooltip(Area));
