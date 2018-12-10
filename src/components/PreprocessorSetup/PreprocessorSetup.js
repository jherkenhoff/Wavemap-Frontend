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
    }

    render() {
        const { setup, selectPreprocessor } = this.props

        const options = [
            {key: 0, value: "average",         text: "Average", disabled: false},
            {key: 1, value: "min",             text: "Min", disabled: false},
            {key: 2, value: "max",             text: "Max", disabled: false},
            {key: 3, value: "histogram",       text: "Histogram", disabled: true},
            {key: 4, value: "fixed_threshold", text: "Fixed threshold", disabled: true},
        ]

        return (
            <div>
            <Form>
                <Form.Field>
                    <label>Preprocessor method</label>
                    <Dropdown
                        placeholder="Select preprocessor"
                        selection
                        onChange={ (e, {value}) => selectPreprocessor(value) }
                        value={setup.preprocessor}
                        options={options}/>
                </Form.Field>
            </Form>
            </div>
        )
    }
}

export default PreprocessorSetup
