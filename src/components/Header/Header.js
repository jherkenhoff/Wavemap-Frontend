import React, { Component } from 'react'
import { Menu, Image, Button, Icon, Label, Step, Loader, Dropdown, Transition, Modal, Popup, Form, Header as SemanticHeader } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FilterSetup, PreprocessorSetup, DatasetSetup } from "components"
import logo from 'resources/logo.svg'

import * as styles from './Header.less'

class Header extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDatasets()
    }

    render() {

        let datasetSelected = this.props.setup.selectedDataset != undefined && this.props.setup.selectedSubset != undefined
        let selectedDataset = this.props.setup.selectedDataset
        let selectedSubset = this.props.setup.selectedSubset
        let availableFilters = this.props.setup.filters.length
        let activeFilters = this.props.setup.filters.filter( (d) => d.active).length

        return (
            <Menu size="large" className={styles.header} stackable>
                <Menu.Item header className={styles.title}>
                    PJET Visualizer
                </Menu.Item>

                <Step.Group className={styles.stepGroup} size="small">
                    <Modal
                        trigger={
                            <Step>
                                <Icon name='database'/>
                                <Step.Content>
                                    <Step.Title>Dataset</Step.Title>
                                    <Step.Description>
                                        {datasetSelected? this.props.datasets[selectedDataset].name + "-" + this.props.datasets[selectedDataset].subsets[selectedSubset].name
                                            : "Select dataset and subset"
                                        }
                                    </Step.Description>
                                </Step.Content>
                            </Step>
                        }>
                        <Modal.Header>Select a Dataset</Modal.Header>
                        <Modal.Content scrolling>
                            <DatasetSetup
                                datasets={this.props.datasets}
                                setup={this.props.setup}
                                selectDataset={this.props.selectDataset}
                                />
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='olive'>
                                <Icon name='checkmark' /> Apply
                            </Button>
                        </Modal.Actions>
                    </Modal>

                    <Popup
                        trigger={
                            <Step link disabled={!datasetSelected}>
                                <Icon name='filter'/>
                                <Step.Content>
                                    <Step.Title>Filter</Step.Title>
                                    <Step.Description>
                                        {availableFilters? "Active filters: " + activeFilters + "/" + availableFilters
                                            : "Setup frequency filters"
                                        }
                                    </Step.Description>
                                </Step.Content>
                            </Step>
                        }
                        content={
                            <FilterSetup
                                setup={this.props.setup}
                                freqBins={datasetSelected? this.props.datasets[selectedDataset].subsets[selectedSubset].freqBins:undefined}
                                handleFilterChange={this.props.handleFilterChange}
                                handleDeleteFilter={this.props.handleDeleteFilter}
                                handleAddFilter={this.props.handleAddFilter}
                                handleToggleFilter={this.props.handleToggleFilter}
                                />}
                        on='click'
                        position='bottom center'
                        />

                    <Popup
                        trigger={
                            <Step link disabled={!datasetSelected}>
                                <Icon name='signal'/>
                                <Step.Content>
                                    <Step.Title>Preprocessor</Step.Title>
                                    <Step.Description>
                                        Method: {this.props.setup.preprocessor}
                                    </Step.Description>
                                </Step.Content>
                            </Step>
                        }
                        content={<PreprocessorSetup setup={this.props.setup} selectPreprocessor={this.props.selectPreprocessor}/>}
                        on='click'
                        position='bottom center'
                        />
                </Step.Group>


                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button.Group basic>
                            <Popup
                                trigger={
                                    <Button icon>
                                        <Icon name='upload' />
                                    </Button>
                                }
                                content="Upload dataset (not implemented yet)"
                                position='bottom center'
                                />
                            <Popup
                                trigger={
                                    <Button icon>
                                        <Icon name='download' />
                                    </Button>
                                }
                                content="Download dataset (not implemented yet)"
                                position='bottom center'
                                />
                            <Popup
                                trigger={
                                    <Button icon>
                                        <Icon name='file image' />
                                    </Button>
                                }
                                content="Save map image (not implemented yet)"
                                position='bottom center'
                                />
                            <Popup
                                trigger={
                                    <Button icon>
                                        <Icon name='map' />
                                    </Button>
                                }
                                on="click"
                                position='bottom center'
                                >
                                    <Popup.Header>Heatmap options</Popup.Header>
                                    <Popup.Content>
                                        <Form>
                                            <Form.Field>
                                                <label>Method</label>
                                                <Dropdown selection text="Hexbin">
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item active>Hexbin</Dropdown.Item>
                                                        <Dropdown.Item disabled>Smooth</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Color scheme</label>
                                                <Dropdown selection text="Hot">
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item active>Hot</Dropdown.Item>
                                                        <Dropdown.Item disabled>Cold</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Form.Field>
                                        </Form>
                                    </Popup.Content>
                            </Popup>
                        </Button.Group>
                    </Menu.Item>
                    <Menu.Item>
                        <Transition animation="jiggle" duration={500} visible={!this.props.setupChanged}>
                            <Button
                                loading={this.props.loading}
                                disabled={!this.props.setupChanged || !datasetSelected}
                                color={(this.props.setupChanged && datasetSelected)? "olive":undefined}
                                onClick={this.props.fetchData}>
                                Update Map
                            </Button>
                        </Transition>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default Header
