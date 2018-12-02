import React, { Component } from 'react'
import { Segment, Header, Transition, Table, Popup, Divider, Placeholder, Form, Button, Dropdown, Icon, Input, Label, Checkbox } from 'semantic-ui-react'
import { CollapseableSegment } from "components"
import InputRange from 'react-input-range'
import "react-input-range/lib/css/index.css"

import * as styles from './MapSetup.less'


class MapSetup extends Component {

    constructor(props) {
        super(props);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onSelectDataset = this.onSelectDataset.bind(this);
        this.onSelectSubset = this.onSelectSubset.bind(this);
    }

    formatRangeLabel(value) {
        var tempValue = 10**value
        var unit = ""
        if (tempValue >= 1e9) {
            tempValue = tempValue / 1e9
            unit = "GHz"
        } else if (tempValue >= 1e6) {
            tempValue = tempValue / 1e6
            unit = "MHz"
        } else if (tempValue >= 1e3) {
            tempValue = tempValue / 1e3
            unit = "kHz"
        } else {
            tempValue = tempValue
            unit = "Hz"
        }

        if (tempValue >= 100) {
            tempValue = tempValue.toFixed(0)
        } else {
            tempValue = tempValue.toFixed(1)
        }

        return tempValue + " " + unit
    }

    onFilterChange(id, value) {
        this.props.handleFilterChange(id, 10**value.min, 10**value.max)
    }

    onSelectDataset(e, {name, value}) {
        this.props.handleSelectDataset(value)
    }

    onSelectSubset(e, {name, value}) {
        this.props.handleSelectSubset(value)
    }

    render() {

        const datasetOptions = this.props.datasets.map( (dataset) => ({
            key: dataset.id,
            value: dataset.id,
            text: dataset.name
        }))

        var subsetOptions = []
        if (this.props.setup.selectedDataset != undefined) {
            subsetOptions = this.props.datasets[this.props.setup.selectedDataset].subsets.map( (subset) => ({
                key: subset.id,
                value: subset.id,
                text: subset.name,
                description: subset.length
            }))
        }

        var additionalLabel = []
        if (this.props.setup.selectedDataset != undefined) {
            additionalLabel = [
                <Popup trigger={
                    <Label color="teal">{this.props.datasets[this.props.setup.selectedDataset].name}</Label>}/>
            ]
        }

        if (this.props.setup.selectedSubset != undefined) {
            additionalLabel.push(<Label color="yellow">{this.props.datasets[this.props.setup.selectedDataset].subsets[this.props.setup.selectedSubset].name}</Label>)
        }

        var deviceInfo = undefined
        if (this.props.setup.selectedDataset != undefined) {
            deviceInfo = (
                <table>
                    <tbody>
                        <tr>
                            <td><Header as="h5">Device</Header></td>
                        </tr>
                        <tr>
                            <td>Name:</td>
                            <td>{this.props.datasets[this.props.setup.selectedDataset].device.name}</td>
                        </tr>
                        <tr>
                            <td>Version:</td>
                            <td>{this.props.datasets[this.props.setup.selectedDataset].device.version}</td>
                        </tr>
                    </tbody>
                </table>
            )
        }

        var subsetInfo = undefined
        if (this.props.setup.selectedSubset != undefined) {
            subsetInfo = (
                <table>
                    <tbody>
                        <tr>
                            <td><Header as="h5">Subset</Header></td>
                        </tr>
                        <tr>
                            <td>Datapoints:</td>
                            <td>{this.props.datasets[this.props.setup.selectedDataset].subsets[this.props.setup.selectedSubset].length}</td>
                        </tr>
                    </tbody>
                </table>
            )
        }

        return (
            <CollapseableSegment
                color={(this.props.setup.selectedDataset == undefined || this.props.setup.selectedSubset == undefined) && "red"}
                header="Dataset"
                icon="database"
                additional={additionalLabel}
                active={this.props.active}>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Dropdown
                            onChange={this.onSelectDataset}
                            placeholder="Select dataset"
                            fluid
                            label="1. Dataset"
                            selection
                            value={this.props.setup.selectedDataset}
                            noResultsMessage="No datasets available"
                            options={datasetOptions}/>
                        <Form.Dropdown
                            onChange={this.onSelectSubset}
                            placeholder="Select subset"
                            fluid
                            label="2. Subset"
                            selection
                            value={this.props.setup.selectedSubset}
                            disabled={this.props.setup.selectedDataset == undefined}
                            noResultsMessage="No subsets available"
                            options={subsetOptions}/>
                    </Form.Group>
                </Form>

                {deviceInfo}
                {subsetInfo}
            </CollapseableSegment>
        )
    }
}

export default MapSetup
