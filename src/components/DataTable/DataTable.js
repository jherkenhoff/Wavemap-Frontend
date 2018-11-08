import React, { Component } from "react"
import { Header, Table, Popup, Dropdown, Icon, Label, Segment, Form, TextArea, Button } from 'semantic-ui-react'
import * as styles from "./DataTable.less"
import testData  from "./data.js"

const center = [53.07, 8.793]

const DataTable = (props) => {

    var segmentColor
    if (!props.isConnected) {
        segmentColor="orange"
    } else if (props.isRunning) {
        segmentColor="green"
    }

    var tableEntries = props.liveSamples.map( (sample, idx) => (
        <Table.Row textAlign="right" key={idx}>
            <Table.Cell textAlign="left">{sample.id}</Table.Cell>
            <Table.Cell>{sample.time}</Table.Cell>
            <Table.Cell>{sample.location.accuracy.toFixed(1) + " m"}</Table.Cell>
            <Table.Cell>{sample.rf_power}</Table.Cell>
        </Table.Row>
    ))

    return (
        <Segment color={segmentColor}>
            <Header as="h3">Data table</Header>
            <Table basic="very" selectable>
                <Table.Header>
                    <Table.Row textAlign="right">
                        <Table.HeaderCell textAlign="left">ID</Table.HeaderCell>
                        <Table.HeaderCell>Time</Table.HeaderCell>
                        <Table.HeaderCell>GPS Accuracy</Table.HeaderCell>
                        <Table.HeaderCell>RF Power</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tableEntries}
                </Table.Body>
            </Table>
        </Segment>
    )
}

export default DataTable
