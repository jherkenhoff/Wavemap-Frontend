import React, { Component } from 'react'
import { Progress, Transition } from 'semantic-ui-react'
import * as styles from './ProgressBar.less'

const ProgressBar = (props) => (
    <div className={styles.progressBar}>
        <Transition visible={props.loading} animation='fade up' duration={1000}>
            <Progress percent={props.percent} indicating color="olive">
                {props.text}
            </Progress>
        </Transition>
    </div>
)

export default ProgressBar
