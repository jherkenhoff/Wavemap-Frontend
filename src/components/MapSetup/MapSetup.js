import React, { Component } from 'react'
import { Segment, Header, Table, Popup, Divider, Placeholder, Form, Button, Dropdown, Icon, Input, Label, Checkbox } from 'semantic-ui-react'
import InputRange from 'react-input-range'
import "react-input-range/lib/css/index.css"

import * as styles from './MapSetup.less'


class MapSetup extends Component {

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

    render() {
        var filterEntries = this.props.filters.map((filter) => (
            <Table.Row>
                <Table.Cell

                    className={styles.slider}>
                    <InputRange
                        className={styles.slider}
                        minValue={Math.log10(1e3)}
                        maxValue={Math.log10(1e9)}
                        formatLabel={this.formatRangeLabel}
                        value={{min: Math.log10(filter.min), max: Math.log10(filter.max)}}/>
                </Table.Cell>
                <Table.Cell collapsing>
                    <Button icon='trash alternate' basic circular/>
                </Table.Cell>
            </Table.Row>
        ));

        return (
            <Segment className={styles.liveSetupSegment}>
                <div className={styles.topAligned}>
                    <Header as="h3">Dataset</Header>
                    <Dropdown
                        placeholder="Select dataset"
                        selection
                        fluid
                        noResultsMessage="No datasets available"/>

                    <Header as="h3">Filter</Header>
                    <Table basic="very">
                        <Table.Body>
                            {filterEntries}
                        </Table.Body>
                    </Table>
                </div>
                <div>
                    <Button positive floated="right">
                        Update Map
                    </Button>
                </div>
            </Segment>
        )
    }
}

export default MapSetup
