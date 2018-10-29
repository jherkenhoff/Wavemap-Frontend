import React, { Component } from 'react'
import { Segment, Header, Table, Popup, Divider, Placeholder, Form, Button, Dropdown, Icon, Input, Label, Checkbox } from 'semantic-ui-react'

import * as styles from './MapSetup.less'


const MapSetup = (props) => {

    var datasets = props.datasets.map(entry => {return {key: entry.id, text: entry.name, value: entry.id}})

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
                            options={datasets}
                            noResultsMessage="No datasets available"/>

                    </Form.Field>
                </Form>
            </div>
        </Segment>
    )
}

export default MapSetup
