import React, { Component } from 'react'
import { Segment, Header, Transition, Table, Popup, Divider, Placeholder, Form, Button, Dropdown, Icon, Input, Label, Checkbox } from 'semantic-ui-react'
import { CollapseableSegment } from "components"
import InputRange from 'react-input-range'
import "react-input-range/lib/css/index.css"

import * as styles from './FilterSetup.less'


class FilterSetup extends Component {

    constructor(props) {
        super(props);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onExamplePreset = this.onExamplePreset.bind(this);
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

    onExamplePreset() {
        this.props.handleAddFilter(2e3, 5e4)
        this.props.handleAddFilter(2e6, 4e7)
        this.props.handleAddFilter(1e8, 1e9)
    }

    render() {
        var filterEntries = this.props.setup.filters.map((filter) => (
                <Table.Row key={filter.id}>
                    <Table.Cell className={styles.slider}>
                        <InputRange
                            disabled={!filter.active}
                            draggableTrack
                            step={0.1}
                            minValue={Math.log10(1e3)}
                            maxValue={Math.log10(1e9)}
                            formatLabel={this.formatRangeLabel}
                            value={{min: Math.log10(filter.min), max: Math.log10(filter.max)}}
                            onChange={value => this.onFilterChange(filter.id, value)}/>
                    </Table.Cell>
                    <Table.Cell collapsing>
                        <Button icon="eye slash" basic={filter.active} circular
                            onClick={() => this.props.handleToggleFilter(filter.id)}/>
                        <Button icon='trash alternate' basic circular
                            onClick={() => this.props.handleDeleteFilter(filter.id)}/>
                    </Table.Cell>
                </Table.Row>
            ));

        const emptyMessage = (
            "No filters set up. You are currently seeing the whole spectrum."
        )

        const info = <Label circular>{filterEntries.length} Active</Label>

        const filterDropdown = (
            <Dropdown
                icon={null}
                trigger={<Label circular>Presets <Icon name="caret down" fitted/></Label>}
                direction="left">
                <Dropdown.Menu>
                    <Dropdown.Header content="Select preset"/>
                    <Dropdown.Item description="3" text="Example Filter"
                        onClick={this.onExamplePreset}/>

                    <Dropdown.Divider/>
                    <Dropdown.Item text="Save"/>
                </Dropdown.Menu>
            </Dropdown>
        )


        return (
            <div  className={styles.filterSetup}>
                <Table basic="very">
                    <Table.Body>
                        {filterEntries}
                        <Table.Row>
                            <Table.Cell>
                                {(filterEntries.length == 0) && emptyMessage}
                            </Table.Cell>
                            <Table.Cell collapsing textAlign="right">
                                <Button icon='plus' basic circular color="olive" onClick={() => this.props.handleAddFilter(1e4, 1e6)}/>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

export default FilterSetup
