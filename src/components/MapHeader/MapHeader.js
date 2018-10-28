import React from 'react'
import { Header, Menu, Icon, Label } from 'semantic-ui-react'

const MapHeader = ({ leftItems, rightItems }) => (
    <Menu attached>
        <Menu.Item header as="a">MAP OVERVIEW</Menu.Item>
        <Menu.Item as="a">
            <Icon name='zoom out' />
        </Menu.Item>
        <Menu.Item as="a">
            <Icon name='zoom in' />
        </Menu.Item>

        <Menu.Menu position='right'>
            <Menu.Item>
                moin
            </Menu.Item>
        </Menu.Menu>
    </Menu>
)

export default MapHeader
