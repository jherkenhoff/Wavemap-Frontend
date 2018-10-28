import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Header, AppLive } from 'components'

import * as styles from './App.less'

const App = () => (
    <Router>
        <div className={styles.appRoot}>
            <Header/>
            <Route path="/live" exact component={AppLive}/>
        </div>
    </Router>
)

export default App
