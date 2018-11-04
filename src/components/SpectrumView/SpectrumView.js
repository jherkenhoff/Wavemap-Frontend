import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import { Brush, ReferenceLine, XAxis, YAxis, ReferenceArea, CartesianGrid, Tooltip, Legend, Area, AreaChart, ResponsiveContainer } from 'recharts';

import * as styles from './SpectrumView.less'

var data = [];
for (var i=1; i<=3+0.01; i+=0.01) {
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
    <Segment className={styles.spectrumViewSegment}>
        <Header as="h3">Spectrum</Header>
        <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                baseValue="dataMin"
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="freq"/>
                <Brush dataKey='freq' height={20} stroke="#8884d8"
                    travellerWidth={20}
                    stroke="#888"/>
                <YAxis allowDecimals={false}/>
                <Tooltip/>
                <ReferenceArea x1={data[150].freq} x2={data[180].freq}/>
                <Area type="monotone" unit=" dBm" name="Mag" dataKey="mag" stroke='#111111' fill='#ffc658' fillOpacity={0.3}/>

            </AreaChart>
        </ResponsiveContainer>
    </Segment>
)

export default SpectrumView
