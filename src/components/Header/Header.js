import React from 'react'
import { Menu, Image, Header as SemanticHeader, Icon, Label, Loader } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from 'resources/logo.svg'

import * as styles from './Header.less'

const Header = (props) => {

    var headerColor
    var headerInverted = false
    if (!props.connected) {
        headerColor = "orange"
        headerInverted = true
    } else if (props.measurementStatus.isRunning) {
        headerColor = "green"
        headerInverted = true
    } else {
        headerColor = undefined
    }

    return (
    <Menu pointing secondary inverted={headerInverted} color={headerColor} size="large">
        <Menu.Item header className={styles.title}>
            PJET Visualizer
        </Menu.Item>
        <Link to="/live">
            <Menu.Item active={props.location.pathname=="/live"}>Live control</Menu.Item>
        </Link>
        <Link to="/map">
            <Menu.Item active={props.location.pathname=="/map"}>Noise Map</Menu.Item>
        </Link>
        <Link to="/raw">
            <Menu.Item active={props.location.pathname=="/raw"}>Raw data</Menu.Item>
        </Link>
    </Menu>
)
}

export default Header
