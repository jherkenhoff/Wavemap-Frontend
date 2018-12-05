import React, { Component } from 'react'
import { Segment, Header, Transition, Table, Popup, Divider, Placeholder, Form, Button, Dropdown, Icon, Input, Label, Checkbox } from 'semantic-ui-react'
import { Brush, ReferenceLine, ReferenceDot, Cell, XAxis, YAxis, ReferenceArea, CartesianGrid, Tooltip, Legend, Area, AreaChart, Bar, BarChart, ResponsiveContainer } from 'recharts';
import { CollapseableSegment } from "components"
import InputRange from 'react-input-range'
import "react-input-range/lib/css/index.css"

import * as styles from './PreprocessorSetup.less'


var data = [];
for (var i=-110; i<=-70; i+=5) {
    data.push({
        mag: i,
        count: Math.random()*100
    });
}


class PreprocessorSetup extends Component {

    constructor(props) {
        super(props);
        this.onPreprocessorTypeChange = this.onPreprocessorTypeChange.bind(this);
    }

    onPreprocessorTypeChange(e) {

    }

    render() {

        const options = [
            {key: 0, value: "AVERAGE",         text: "Average", disabled: false},
            {key: 1, value: "MIN",             text: "Min", disabled: true},
            {key: 2, value: "MAX",             text: "Max", disabled: true},
            {key: 3, value: "HISTOGRAM",       text: "Histogram", disabled: true},
            {key: 4, value: "FIXED_THRESHOLD", text: "Fixed threshold", disabled: true},
        ]

        return (
            <CollapseableSegment
                header="Heatmap Preprocessor"
                icon="code"
                additional={<Label color="yellow">Average</Label>}>
                <Dropdown
                    placeholder="Select preprocessor"
                    fluid
                    selection
                    options={options}
                    value="AVERAGE"/>

                <ResponsiveContainer width="100%" height={150}>
                    <BarChart
                        data={data}
                        margin={{ top: 30, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="mag"/>
                        <YAxis/>
                        <Bar dataKey="count">
                            {
                                data.map((entry, index) => (
                                    <Cell fill='#8884d8'/>
                                ))
                            }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CollapseableSegment>
        )
    }
}

export default PreprocessorSetup
