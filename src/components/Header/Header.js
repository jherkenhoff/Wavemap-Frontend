import React, { Component } from 'react'
import { Menu, Image, Button, Icon, Label, Loader, Dropdown, Transition, Modal, Popup } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FilterSetup } from "components"
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

        let setupValid = this.props.setup.selectedDataset != undefined && this.props.setup.selectedSubset != undefined

        return (
            <Menu size="large" className={styles.header}>
                <Menu.Item header className={styles.title}>
                    PJET Visualizer
                </Menu.Item>
                <Dropdown text="Select dataset" className='link item'>
                    <Dropdown.Menu>
                        <Dropdown.Header>Select Dataset</Dropdown.Header>
                        {this.props.datasets.map( (dataset) => (
                            <Dropdown.Item key={dataset.id} active={this.props.setup.selectedDataset == dataset.id}>
                                <Dropdown text={dataset.name}>
                                    <Dropdown.Menu>
                                        <Dropdown.Header>Select Subset</Dropdown.Header>
                                        {dataset.subsets.map( (subset) => (
                                            <Dropdown.Item
                                                active={(this.props.setup.selectedDataset == dataset.id) && (this.props.setup.selectedSubset == subset.id)}
                                                key={subset.id}
                                                text={subset.name}
                                                description={subset.length}
                                                onClick={ () => this.props.selectDataset(dataset.id, subset.id)}
                                                />
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Popup
                    trigger={
                        <Menu.Item>
                            <Icon name="filter" />
                            Filter
                            <Label>{this.props.setup.filters.length}</Label>
                        </Menu.Item>
                    }
                    content={
                        <FilterSetup
                            setup={this.props.setup}
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
                        <Menu.Item>
                            <Icon name="database" />
                            Preprocessor
                            <Label>Average</Label>
                        </Menu.Item>
                    }
                    content="Not implemented yet"
                    on='click'
                    position='bottom center'
                    />

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
                        </Button.Group>
                    </Menu.Item>
                    <Menu.Item>
                        <Transition animation="jiggle" duration={500} visible={!this.props.setupChanged}>
                            <Button
                                loading={this.props.loading}
                                disabled={!this.props.setupChanged || !setupValid}
                                color={(this.props.setupChanged && setupValid)? "olive":undefined}
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
