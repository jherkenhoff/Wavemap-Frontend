import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import { Brush, ReferenceLine, ReferenceDot, XAxis, YAxis, ReferenceArea, CartesianGrid, Tooltip, Legend, Area, AreaChart, ResponsiveContainer } from 'recharts';
import { CollapseableSegment } from "components"

import * as styles from './SpectrumView.less'

var data = [];
for (var i=3; i<=9+0.01; i+=0.01) {
    data.push({
        freq: (10**i).toPrecision(5),
        mag: (10*Math.log10(6e-9 + 2e-9 * Math.random()))
    });
}

for (var i = 62; i < 70; i++) {
    data[i].mag += 3
}

for (var i = 0; i < 30; i++) {
    data[i].mag += 2+i/7
}

data[110].mag += 12
data[150].mag += 7
data[160].mag += 5

for (var i = 140; i < 200; i++) {
    data[i].mag += 1.3
}

const SpectrumView = (props) => (
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

            </AreaChart>
        </ResponsiveContainer>
    </CollapseableSegment>
)

export default SpectrumView
