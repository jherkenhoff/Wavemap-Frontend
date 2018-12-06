import React, { Component } from 'react'
import { Segment, Header, Menu, Transition, Table, Popup, Divider, Placeholder, Form, Button, Dropdown, Icon, Input, Label, Checkbox } from 'semantic-ui-react'

import * as styles from './CollapseableSegment.less'


class CollapseableSegment extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            isOpen: false
        }

        if (this.props.active != undefined) {
            this.state.isOpen = this.props.active
        }
    }

    handleClick() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        if (typeof this.props.icon == "string") {
            var icon = <Icon name={this.props.icon}/>
        } else {
            var icon = this.props.icon
        }
        return (
            <Segment.Group className={styles.segment}>
                <Segment onClick={this.handleClick} color={this.props.color}>
                    <Icon name={this.state.isOpen? "caret down":"caret right"}/>
                    <b>{this.props.header}</b>
                    <div className={styles.rightHeader}>
                        <Transition.Group animation="fade left" duration={500} className={styles.additional}>
                            {this.props.additional}
                        </Transition.Group>
                        {icon}
                    </div>
                </Segment>

                {this.state.isOpen && <Segment loading={this.props.loading}>{this.props.children}</Segment>}

            </Segment.Group>
        )
    }
}

export default CollapseableSegment


// <div>
//     <Menu attached="top" fluid borderless>
//         <Menu.Item header link onClick={this.handleClick}>
//             <Icon name={this.state.isOpen? "caret down":"caret right"}/>
//             {this.props.header}
//         </Menu.Item>
//         <Menu.Menu position="right">
//             <Menu.Item fitted>
//                 <Transition.Group animation="fade left" duration={500}>
//                     {this.props.additional}
//                 </Transition.Group>
//             </Menu.Item>
//             <Menu.Item>
//                 <Icon name={this.props.icon}/>
//             </Menu.Item>
//         </Menu.Menu>
//     </Menu>
//     {this.state.isOpen? <Segment children={this.props.children} attached="bottom"/>:undefined}
// </div>
