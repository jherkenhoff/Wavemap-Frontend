import React, { Component } from 'react'
import { Segment, Header, Table, Popup, Divider, Placeholder, Form, Button, Dropdown, Icon, Input, Label, Checkbox } from 'semantic-ui-react'
import InputRange from 'react-input-range'
import "react-input-range/lib/css/index.css"

import * as styles from './MapSetup.less'


class MapSetup extends Component {

    formatRangeLabel(value) {
        return 10**value
    }

    render() {
        var filterEntries = this.props.filters.map((filter) => (
            <Table.Row>
                <Table.Cell>
                    <InputRange
                        maxValue={20}
                        minValue={0}
                        formatLabel={this.formatRangeLabel}
                        value={{min: filter.min, max: filter.max}}/>
                </Table.Cell>
                <Table.Cell collapsing>
                    <Button icon='trash alternate'  basic circular/>
                </Table.Cell>
            </Table.Row>
        ));

        return (
            <Segment className={styles.liveSetupSegment}>
                <div className={styles.topAligned}>
                    <Header as="h3">Map Setup</Header>
                    <Form>
                        <Form.Field>
                            <label>Dataset</label>
                            <Dropdown
                                placeholder="Select dataset"
                                selection
                                fluid
                                noResultsMessage="No datasets available"/>
                        </Form.Field>
                    </Form>

                    <Header as="h3">Filter</Header>
                    <Table basic="very">
                        <Table.Body>
                            {filterEntries}
                        </Table.Body>
                    </Table>
                </div>
                <div>
                    <Button positive floated="right">
                        Update
                    </Button>
                </div>
            </Segment>
        )
    }
}

export default MapSetup
