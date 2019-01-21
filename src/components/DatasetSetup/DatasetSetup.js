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
                    const thumbnail = dataset.subsets[0].thumbnail
                    return (
                        <Card onClick={ () => this.props.selectDataset(dataset.id, this.props.setup.selectedDataset == dataset.id? this.props.setup.selectedSubset:0)}>
                            <Image
                                src={thumbnail}
                                className={styles.thumbnail}
                                label={this.state.selectedDataset == dataset.id? selectedLabel:undefined}/>
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
                                    Red Pitaya (V1.0)
                                </Card.Meta>
                                <Card.Description>
                                    <table>
                                        <tr>
                                            <td>Device:</td>
                                            <td>Red-Pitaya</td>
                                        </tr>
                                        <tr>
                                            <td>Spectrum:</td>
                                            <td>0 Hz - 30 MHz</td>
                                        </tr>
                                        <tr>
                                            <td>Samples:</td>
                                            <td>24</td>
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
