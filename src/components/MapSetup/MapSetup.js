import React, { Component } from 'react'
import { Segment, Header, Transition, Table, Popup, Divider, Placeholder, Form, Button, Dropdown, Icon, Input, Label, Checkbox } from 'semantic-ui-react'
import InputRange from 'react-input-range'
import "react-input-range/lib/css/index.css"

import * as styles from './MapSetup.less'


class MapSetup extends Component {

    constructor(props) {
        super(props);
        this.onFilterChange = this.onFilterChange.bind(this);
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

    render() {
        var filterEntries = this.props.filters.map((filter) => (
            <Table.Row key={filter.id}>
                <Table.Cell

                    className={styles.slider}>
                    <InputRange
                        draggableTrack
                        step={0.1}
                        minValue={Math.log10(1e3)}
                        maxValue={Math.log10(1e9)}
                        formatLabel={this.formatRangeLabel}
                        value={{min: Math.log10(filter.min), max: Math.log10(filter.max)}}
                        onChange={value => this.onFilterChange(filter.id, value)}/>
                </Table.Cell>
                <Table.Cell collapsing>
                    <Button icon='trash alternate' basic circular
                        onClick={() => this.props.handleDeleteFilter(filter.id)}/>
                </Table.Cell>
            </Table.Row>
        ));

        const emptyMessage = (
            "No filters set up. You are currently seeing the whole spectrum."
        )

        const dropdownOptions = this.props.datasets.map( (dataset) => ({
            key: dataset.id,
            value: dataset.id,
            text: dataset.name
        }))

        return (
            <Segment className={styles.liveSetupSegment}>
                <div className={styles.topAligned}>
                    <Header as="h3">Dataset</Header>
                    <Dropdown
                        placeholder="Select dataset"
                        fluid
                        selection
                        search
                        noResultsMessage="No datasets available"
                        options={dropdownOptions}/>

                    <Table basic="very">
                        <Table.Header>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as="h3">Filter</Header>
                                </Table.Cell>
                                <Table.Cell collapsing>
                                    <Button icon='plus' basic positive circular
                                        onClick={ () => this.props.handleAddFilter(3e3, 3e6)}/>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {filterEntries.length == 0 ? emptyMessage : filterEntries}
                        </Table.Body>
                    </Table>
                </div>
                <div>
                    <Button positive floated="right" onClick={ () => {this.props.fetchData(0,0)}}>
                        Update Map
                    </Button>
                </div>
            </Segment>
        )
    }
}

export default MapSetup
