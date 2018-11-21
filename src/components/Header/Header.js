import React from 'react'
import { Menu, Image, Header as SemanticHeader, Icon, Label, Loader } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from 'resources/logo.svg'

import * as styles from './Header.less'

const Header = (props) => {

    return (
    <Menu pointing secondary size="large" className={styles.header}>
        <Menu.Item header className={styles.title}>
            PJET Visualizer
        </Menu.Item>
        <Link to="/map">
            <Menu.Item active={props.location.pathname=="/map"}>Noise Map</Menu.Item>
        </Link>
        <Link to="/live">
            <Menu.Item active={props.location.pathname=="/live"} disabled>Live control</Menu.Item>
        </Link>
        <Link to="/raw">
            <Menu.Item active={props.location.pathname=="/raw"}  disabled>Raw data</Menu.Item>
        </Link>
    </Menu>
)
}

export default Header
