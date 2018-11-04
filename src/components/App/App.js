import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { HeaderContainer, AppLiveContainer, AppMapContainer } from 'containers'

import * as styles from './App.less'

const App = (props) => (
    <Router>
        <div className={styles.appRoot}>
            <Redirect from="/" to="/map"/>
            <Route path="/" component={HeaderContainer}/>
            <Route path="/live" exact component={AppLiveContainer}/>
            <Route path="/map" exact component={AppMapContainer}/>
        </div>
    </Router>
)

export default App
