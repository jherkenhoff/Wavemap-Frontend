import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { HeaderContainer, AppMapContainer } from 'containers'

import * as styles from './App.less'



class App extends React.Component {

    componentDidMount() {
        this.props.fetchDatasets()
    }

    render() {
        return (
            <Router>
                <div className={styles.appRoot}>
                    <Route path="/" component={HeaderContainer}/>
                    <Route path="/map" exact component={AppMapContainer}/>
                    <Redirect from="/" to="/map"/>
                </div>
            </Router>
        )
    }
}

export default App
