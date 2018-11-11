import React, { Component } from 'react'
import { Segment, Header, Table, Loader, Popup, Divider, Placeholder, Form, Button, Dropdown, Icon, Input, Label, Checkbox } from 'semantic-ui-react'

import * as styles from './LiveSetup.less'


const intervalOptions = [
  { key: 'meter', text: 'meters', value: 'meters' },
  { key: 'seconds', text: 'seconds', value: 'seconds' }
]

function formatFrequencyRange(freqRange) {

    if (freqRange === undefined) return

    function formatSiPrefix(num) {
        if (num >= 1e9) { return num/1e9 + " GHz" }
        else if (num >= 1e6) { return num/1e6 + " MHz" }
        else if (num >= 1e3) { return num/1e3 + " kHz" }
        else { return num }
    }

    return formatSiPrefix(freqRange.lower) + " - " + formatSiPrefix(freqRange.upper)
}


const LiveSetup = (props) => {

    var segmentColor
    if (!props.isConnected) {
        segmentColor="orange"
    } else if (props.isRunning) {
        segmentColor="green"
    }

    var datasets = props.datasets.map(entry => {return {key: entry.name, text: entry.name, value: entry.name, disabled: !entry.is_compatible}})

    var frequencyRange = {
        lower: Math.min(...props.deviceInfo.frequency_bins),
        upper: Math.max(...props.deviceInfo.frequency_bins),
    }

    return (
        <Segment className={styles.liveSetupSegment} color={segmentColor}>
            <div className={styles.topAligned}>
                <Header as="h3">Device
                    <Label color={props.isConnected? "yellow":"red"} >
                        {props.isConnected? props.deviceInfo.name:"Disconnected"}
                    </Label>
                </Header>

                <Table basic="very">
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell collapsing>Version</Table.Cell>
                            <Table.Cell>{props.deviceInfo.version}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell collapsing>Frequency range</Table.Cell>
                            <Table.Cell>{formatFrequencyRange(frequencyRange)}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell collapsing>Frequency bins</Table.Cell>
                            <Table.Cell>{props.deviceInfo.frequency_bins.length}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>

                <Divider/>
                <Header as="h3">Setup</Header>

                <Form>
                    <Form.Field>
                        <label>Dataset</label>
                        <Dropdown
                            placeholder="Select/create Dataset"
                            search
                            disabled={!props.isConnected || props.isRunning}
                            selection
                            fluid
                            options={datasets}
                            noResultsMessage="No compatible datasets available"
                            allowAdditions
                            value={props.selectedDataset}
                            onAddItem={props.onAddDataset}
                            onChange={props.onSelectDataset}
                            additionLabel={<span style={{ color: 'green' }}><Icon name='database'/> Create new dataset: </span>}/>

                    </Form.Field>
                    <Form.Group grouped>
                        <Form.Field>
                            <label>Sampling interval</label>
                            <Popup
                                trigger={<Checkbox toggle onChange={console.log} label="Crazy mode"
                                    disabled={!props.isConnected || props.isRunning}/>}
                                content="Take samples as fast as possible"/>

                        </Form.Field>
                        <Form.Field>
                            <Input
                                fluid
                                disabled={!props.isConnected || props.isRunning}
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
                <Button
                    disabled={!props.isConnected || props.isRunning || (props.selectedDataset == null)}
                    onClick={props.handleStartSingleSample}>
                    Single
                </Button>
                <Button.Or />
                <Button color={props.isRunning? "red":"green"} disabled={!props.isConnected || (props.selectedDataset == null)}
                    onClick={() => props.onChangeMeasurementRunning(!props.isRunning)}>
                    {props.isRunning? "Stop":"Run"}
                </Button>
            </Button.Group>
        </Segment>
    )
}

export default LiveSetup
