import React, { Component } from 'react'
import { Segment, Header, Table, Popup, Divider, Form, Button, Dropdown, Icon, Input, Label, Checkbox } from 'semantic-ui-react'

import * as styles from './LiveSetup.less'


const intervalOptions = [
  { key: 'meter', text: 'meters', value: 'meters' },
  { key: 'seconds', text: 'seconds', value: 'seconds' }
]


const LiveSetup = (props) => {

    var datasets = props.datasets.map(entry => {return {key: entry.id, text: entry.name, value: entry.id}})

    return (
        <Segment className={styles.liveSetupSegment}>
            <div className={styles.topAligned}>
                <Header as="h3">Device
                    <Label color='yellow' >{props.deviceInfo.name}</Label></Header>
                <Table basic="very">
                    <Table.Row>
                        <Table.Cell collapsing>Version</Table.Cell>
                        <Table.Cell>{props.deviceInfo.version}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell collapsing>Frequency range</Table.Cell>
                        <Table.Cell>50 MHz - 2 GHz</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell collapsing>Frequency bins</Table.Cell>
                        <Table.Cell>{props.deviceInfo.frequency_bins}</Table.Cell>
                    </Table.Row>
                </Table>

                <Divider/>
                <Header as="h3">Setup</Header>

                <Form>
                    <Form.Field>
                        <label>Dataset</label>
                        <Dropdown
                            placeholder="Select/create Dataset"
                            search
                            selection
                            fluid
                            options={datasets}
                            noResultsMessage={<span>No datasets available.<br/>Start typing to create a new one</span>}
                            allowAdditions
                            value={props.selectedDataset}
                            onAddItem={props.onAddDataset}
                            onChange={props.onSelectDataset}
                            additionLabel={<span style={{ color: 'green' }}><Icon name='database'/> Create new dataset: </span>}/>

                    </Form.Field>
                    <Form.Group grouped>
                        <Form.Field>
                            <label>Sampling interval</label>
                            <Popup trigger={<Checkbox toggle label="Crazy mode" />} content="Take samples as fast as possible" />

                        </Form.Field>
                        <Form.Field>
                            <Input
                                fluid
                                label={<Dropdown defaultValue="seconds" options={intervalOptions} />}
                                labelPosition="right"
                                placeholder='Enter interval'
                                />
                        </Form.Field>
                    </Form.Group>

                    <Form.Field>
                    </Form.Field>
                </Form>
            </div>

            <Button.Group fluid className={styles.buttonGroup}>
                <Button>Single</Button>
                <Button.Or />
                <Button positive>Run</Button>
            </Button.Group>
        </Segment>
    )
}

export default LiveSetup
