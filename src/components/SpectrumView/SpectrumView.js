import React from 'react'
import { Segment, Header, Statistic } from 'semantic-ui-react'
import { Brush, ReferenceLine, ReferenceDot, XAxis, YAxis, ReferenceArea, CartesianGrid, Tooltip, Legend, Area, AreaChart, ResponsiveContainer } from 'recharts';
import { AreaClosed } from "@vx/shape"
import { Group } from '@vx/group';
import { scaleLinear, scaleBand } from '@vx/scale'
import { CollapseableSegment, Spectrum } from "components"

import * as styles from './SpectrumView.less'

// accessors
const freq = d => d.freq
const mag = d => d.mag

const SpectrumView = (props) => {

    let sample = props.marker.sample
    let sampleAvailable = (sample != undefined)
    let spectrum = sampleAvailable? sample.spectrum:undefined

    let statistics = (
        <Statistic.Group size="mini" widths="three">
            <Statistic>
                <Statistic.Label>Average</Statistic.Label>
                <Statistic.Value>22</Statistic.Value>
            </Statistic>
            <Statistic>
                <Statistic.Label>Max</Statistic.Label>
                <Statistic.Value>31,200</Statistic.Value>
            </Statistic>
            <Statistic>
                <Statistic.Label>Min</Statistic.Label>
                <Statistic.Value>22</Statistic.Value>
            </Statistic>
        </Statistic.Group>
    )

    return (
        <CollapseableSegment header="Spectrum" icon="chart area" loading={props.marker.loading}>
            {statistics}
            {sampleAvailable? <Spectrum data={spectrum}/>:undefined}
        </CollapseableSegment>
    )
}

export default SpectrumView
