import React, { Component } from 'react'
import { Menu, Image, Button, Card, Icon, Label, Step, Loader, Dropdown, Transition, Modal, Popup, Form, Header, Radio } from 'semantic-ui-react'
import { formatSiPrefix } from "utils"

import * as styles from './DatasetSetup.less'

class DatasetSetup extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const selectedLabel = { as: 'a', icon:"checkmark", corner:"right", color:"olive"}

        return (
            <Card.Group itemsPerRow={3}>
                { this.props.datasets.map( (dataset) => (
                    dataset.subsets.map( (subset) => (
                        <Card link onClick={ () => this.props.selectDataset(dataset.id, subset.id)}>
                            <Image src={subset.thumbnail}
                                label={(this.props.setup.selectedDataset == dataset.id) && (this.props.setup.selectedSubset == subset.id)? selectedLabel:undefined}/>
                            <Card.Content>
                                <Card.Header>{dataset.name}</Card.Header>
                                <Card.Meta>
                                    {dataset.device.name} ({dataset.device.version})
                                </Card.Meta>
                                <Card.Description>
                                    {formatSiPrefix(subset.freqBins[0])} - {formatSiPrefix(subset.freqBins[subset.freqBins.length-1])} (RBW: {formatSiPrefix(subset.freqBins[1] - subset.freqBins[0])})
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <a>
                                    <Icon name='map pin' />
                                    {subset.length} Locations
                                </a>
                            </Card.Content>
                        </Card>
                    ))
                ))}
            </Card.Group>
        )
    }
}

export default DatasetSetup
