import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { HeaderContainer, HeatmapContainer } from 'containers'

import * as styles from './App.less'



class App extends React.Component {

    componentDidMount() {
        this.props.fetchDatasets()
    }

    render() {
        return (
            <Router>
                <div className={styles.appRoot}>
                    <HeaderContainer/>
                    <HeatmapContainer/>
                </div>
            </Router>
        )
    }
}

export default App
