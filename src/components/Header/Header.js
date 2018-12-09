import React, { Component } from 'react'
import { Menu, Image, Button, Icon, Label, Loader, Dropdown, Transition } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
        console.log(this.props);
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
                <Menu.Item>
                    <Icon name='video camera' />
                    Channels
                    <Label color='teal'>1</Label>
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Transition animation="jiggle" duration={500} visible={!this.props.setupChanged}>
                            <Button
                                loading={this.props.loading}
                                disabled={!this.props.setupChanged}
                                color={this.props.setupChanged? "olive":undefined}
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
