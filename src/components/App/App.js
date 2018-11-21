import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { HeaderContainer, AppLiveContainer, AppMapContainer } from 'containers'

import * as styles from './App.less'

const App = (props) => (
    <Router>
        <div className={styles.appRoot}>
            <Route path="/" component={HeaderContainer}/>
            <Route path="/live" exact component={AppLiveContainer}/>
            <Route path="/map" exact component={AppMapContainer}/>
            <Redirect from="/" to="/map"/>
        </div>
    </Router>
)

export default App
