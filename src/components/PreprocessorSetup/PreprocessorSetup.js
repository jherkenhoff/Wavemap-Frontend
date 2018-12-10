import React, { Component } from 'react'
import { Segment, Header, Transition, Table, Popup, Divider, Placeholder, Form, Button, Dropdown, Icon, Input, Label, Checkbox } from 'semantic-ui-react'
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
            <div>
            <Form>
                <Form.Field>
                    <label>Preprocessor method</label>
                    <Dropdown
                        placeholder="Select preprocessor"
                        selection
                        options={options}
                        value="AVERAGE"/>
                </Form.Field>
            </Form>
            </div>
        )
    }
}

export default PreprocessorSetup
