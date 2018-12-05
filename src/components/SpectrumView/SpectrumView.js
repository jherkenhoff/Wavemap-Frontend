import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import { Brush, ReferenceLine, ReferenceDot, XAxis, YAxis, ReferenceArea, CartesianGrid, Tooltip, Legend, Area, AreaChart, ResponsiveContainer } from 'recharts';
import { CollapseableSegment } from "components"

import * as styles from './SpectrumView.less'

const SpectrumView = (props) => {

    let data = props.selectedSample.spectrum
    let dataAvailable = (data != undefined)

    let max
    let maxIndex
    if (dataAvailable) {
        max = data[0].mag
        maxIndex = 0
        for (let i = 1; i < data.length; i++) {
            let v = data[i].mag;
            if (v > max) {
                max = v
                maxIndex = i
            }
        }
    }

    return (
        <CollapseableSegment header="Spectrum" icon="chart area">
            <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={props.selectedSample.spectrum}
                    margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                    baseValue="dataMin"
                >
                    {props.setup.filters.map( (filter, i) => (
                        <ReferenceArea
                            key={i}
                            x1={filter.min}
                            x2={filter.max}
                            fill={filter.active? "rgb(197, 202, 233)":"#aaa"}
                            fillOpacity={filter.active? 1:0.3}/>
                    ))}
                    <CartesianGrid stroke="#000" strokeOpacity={0.3} strokeDasharray="3 3"/>
                    <XAxis dataKey="freq" scale="log"/>
                    <YAxis allowDecimals={false}/>
                    <Tooltip/>
                    <Area type="monotone" unit=" dBm" name="Mag" dataKey="mag" stroke='#111111' fill='#ffc658' fillOpacity={0.3}/>

                    {dataAvailable? <ReferenceLine y={data[maxIndex].mag} stroke="red" strokeDasharray="3 3" /> : undefined}
                    {dataAvailable? <ReferenceLine x={data[maxIndex].freq} stroke="red" strokeDasharray="3 3" /> : undefined}

                </AreaChart>
            </ResponsiveContainer>
        </CollapseableSegment>
    )
}

export default SpectrumView
