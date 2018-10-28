import React from 'react'
import { Segment } from 'semantic-ui-react'
import { Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';

import * as styles from './SpectrumView.less'

var data = [];
for (var i=1; i<=3+0.01; i+=0.01) {
    data.push({
        freq: (10**i).toPrecision(5),
        uv: (10*Math.log10(6e-9 + 1e-9 * Math.random())),
        pv: (10*Math.log10(6e-9 + 1e-9 * Math.random()))
    });
}

const SpectrumView = () => (
    <Segment className={styles.spectrumViewSegment}>
        <AreaChart width={400} height={200} data={data}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            baseValue="dataMin"
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="freq" scale="log" allowDecimals={false} interval="preserveStartEnd"/>
            <YAxis allowDecimals={false}/>
            <Tooltip/>
            <Area dataKey="pv" fill="#8884d8" />
        </AreaChart>
    </Segment>
)

export default SpectrumView
