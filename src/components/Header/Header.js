import React from 'react'
import { Menu, Image, Header as SemanticHeader, Icon } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from 'resources/logo.svg'

import * as styles from './Header.less'

const Header = () => (
    <Menu pointing secondary size="large">
        <Menu.Item header className={styles.title}>
            PJET Control
        </Menu.Item>
        <Link to="/live">
            <Menu.Item active>Live</Menu.Item>
        </Link>
        <Link to="/dash">
            <Menu.Item>Dashboard</Menu.Item>
        </Link>
        <Link to="/raw">
            <Menu.Item>Raw data</Menu.Item>
        </Link>
    </Menu>
)

export default Header
