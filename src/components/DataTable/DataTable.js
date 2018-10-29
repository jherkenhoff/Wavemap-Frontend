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
                        <Table.HeaderCell textAlign="center">Note</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row textAlign="right">
                        <Table.Cell textAlign="left">0</Table.Cell>
                        <Table.Cell>22:57:52</Table.Cell>
                        <Table.Cell>12 m</Table.Cell>
                        <Table.Cell>-75 dBm</Table.Cell>
                        <Table.Cell textAlign="center">
                            <Popup
                                trigger={<Icon link name="sticky note outline"/>}
                                on="click"
                                position="right center"
                            >
                                <Popup.Header>Datapoint note</Popup.Header>
                                <Popup.Content>
                                    <Form>
                                        <Form.Field>
                                            <TextArea autoHeight placeholder="Enter note"/>
                                        </Form.Field>
                                        <Form.Field className={styles.popupButtonField}>
                                            <Button.Group>
                                                <Button disabled icon="trash alternate"/>
                                                <Button color="green" icon="check"/>
                                            </Button.Group>
                                        </Form.Field>
                                    </Form>
                                </Popup.Content>
                            </Popup>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row textAlign="right">
                        <Table.Cell textAlign="left">1</Table.Cell>
                        <Table.Cell>22:59:12</Table.Cell>
                        <Table.Cell>13 m</Table.Cell>
                        <Table.Cell>-82 dBm</Table.Cell>
                        <Table.Cell textAlign="center">
                            <Popup
                                trigger={<Icon link color="green" name="sticky note"/>}
                                on="click"
                                position="right center"
                            >
                                <Popup.Header>Datapoint note</Popup.Header>
                                <Popup.Content>
                                    <Form>
                                        <Form.Field>
                                            <TextArea autoHeight placeholder="Enter note" value="Loose antenna connection"/>
                                        </Form.Field>
                                        <Form.Field className={styles.popupButtonField}>
                                            <Button.Group>
                                                <Button icon="trash alternate"/>
                                                <Button color="green" icon="check"/>
                                            </Button.Group>
                                        </Form.Field>
                                    </Form>
                                </Popup.Content>
                            </Popup>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row textAlign="right">
                        <Table.Cell textAlign="left">2</Table.Cell>
                        <Table.Cell>23:07:43</Table.Cell>
                        <Table.Cell>20 m</Table.Cell>
                        <Table.Cell>-61 dBm</Table.Cell>
                        <Table.Cell textAlign="center">
                            <Popup
                                trigger={<Icon link name="sticky note outline"/>}
                                on="click"
                                position="right center"
                            >
                                <Popup.Header>Datapoint note</Popup.Header>
                                <Popup.Content>
                                    <Form>
                                        <Form.Field>
                                            <TextArea autoHeight placeholder="Enter note"/>
                                        </Form.Field>
                                        <Form.Field className={styles.popupButtonField}>
                                            <Button.Group>
                                                <Button disabled icon="trash alternate"/>
                                                <Button color="green" icon="check"/>
                                            </Button.Group>
                                        </Form.Field>
                                    </Form>
                                </Popup.Content>
                            </Popup>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Segment>
    )
}

export default DataTable
