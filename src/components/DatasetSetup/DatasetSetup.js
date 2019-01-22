import React, { Component } from 'react'
import { Menu, Image, Button, Card, Icon, Label, Step, Loader, Dropdown, Transition, Modal, Popup, Form, Header, Radio } from 'semantic-ui-react'
import { formatSiPrefix } from "utils"

import * as styles from './DatasetSetup.less'

class DatasetSetup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDataset: undefined,
            selectedSubset: undefined
        }
    }

    render() {

        const selectedLabel = { as: 'a', icon:"checkmark", corner:"right", color:"olive"}

        return (
            <Card.Group itemsPerRow={3}>
                { this.props.datasets.map( (dataset) => {
                    const subsetOptions = dataset.subsets.map( (subset) => ({text: subset.name, value: subset.id}) )
                    //const thumbnail = "http://dl0ht-2.fk4.hs-bremen.de:33680" + dataset.subsets[0].thumbnail
                    const thumbnail = dataset.subsets[0].thumbnail
                    return (
                        <Card onClick={ () => this.props.selectDataset(dataset.id, this.props.setup.selectedDataset == dataset.id? this.props.setup.selectedSubset:0)}>
                            <Image
                                src={thumbnail}
                                className={styles.thumbnail}
                                label={this.props.setup.selectedDataset == dataset.id? selectedLabel:undefined}/>
                            <Card.Content>
                                <Card.Header>
                                    {dataset.name}
                                    <Dropdown
                                        className={styles.subsetDropdown}
                                        value={this.props.setup.selectedDataset == dataset.id? this.props.setup.selectedSubset:0}
                                        options={subsetOptions}
                                        onChange={ (e, {value}) => this.props.selectDataset(dataset.id, value)}/>
                                </Card.Header>
                                <Card.Meta>
                                    {dataset.device.name} {dataset.device.version}
                                </Card.Meta>
                                <Card.Description>
                                    <table>
                                        <tr>
                                            <td>Bandwidth:</td>
                                            <td>{formatSiPrefix(dataset.subsets[0].freqBins[0])} - {formatSiPrefix(dataset.subsets[0].freqBins[dataset.subsets[0].freqBins.length-1])}</td>
                                        </tr>
                                        <tr>
                                            <td>Resolution:</td>
                                            <td>{formatSiPrefix(dataset.subsets[0].freqBins[1] - dataset.subsets[0].freqBins[0])} ({dataset.subsets[0].freqBins.length} bins)</td>
                                        </tr>
                                        <tr>
                                            <td>Locations:</td>
                                            <td>{dataset.subsets[0].length}</td>
                                        </tr>
                                    </table>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Icon name="clock"/>19:32 <Icon name="calendar alternate outline"/>21.01.2019
                            </Card.Content>
                        </Card>
                    )
                })}
            </Card.Group>
        )
    }
}

export default DatasetSetup
