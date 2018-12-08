import React, { Component } from 'react'
import { Menu, Image, Header as SemanticHeader, Icon, Label, Loader, Dropdown } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from 'resources/logo.svg'

import * as styles from './Header.less'

class Header extends Component {

    constructor(props) {
        super(props);
        this.onSelectDataset = this.onSelectDataset.bind(this);
        this.onSelectSubset = this.onSelectSubset.bind(this);
    }

    onSelectDataset(e, {name, value}) {
        this.props.handleSelectDataset(value)
    }

    onSelectSubset(e, {name, value}) {
        this.props.handleSelectSubset(value)
    }

    render() {

        const datasetOptions = this.props.datasets.map( (dataset) => ({
            key: dataset.id,
            value: dataset.id,
            text: dataset.name
        }))

        var subsetOptions = []
        if (this.props.setup.selectedDataset != undefined) {
            subsetOptions = this.props.datasets[this.props.setup.selectedDataset].subsets.map( (subset) => ({
                key: subset.id,
                value: subset.id,
                text: subset.name,
                description: subset.length
            }))
        }

        return (
            <Menu size="large" className={styles.header}>
                <Menu.Item header className={styles.title}>
                    PJET Visualizer
                </Menu.Item>
                <Menu.Item>
                    <Dropdown
                        placeholder="Dataset"
                        value={this.props.setup.selectedDataset}
                        noResultsMessage="No datasets available"
                        options={datasetOptions}
                        onChange={this.onSelectDataset}
                        error/>
                    <Dropdown
                        onChange={this.onSelectSubset}
                        placeholder="Select subset"
                        value={this.props.setup.selectedSubset}
                        disabled={this.props.setup.selectedDataset == undefined}
                        noResultsMessage="No subsets available"
                        options={subsetOptions}/>
                </Menu.Item>
                <Menu.Item>
                    <Icon name='video camera' />
                    Channels
                    <Label color='teal'>1</Label>
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item color="green" onClick={this.props.fetchData}>
                        Update
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default Header
