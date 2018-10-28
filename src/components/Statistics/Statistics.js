import React from 'react'
import { Statistic, Segment } from 'semantic-ui-react'

import * as styles from './Statistics.less'

const Statistics = () => (
    <Segment basic className={styles.statisticsSegment}>
        <Statistic.Group size="small" className={styles.statisticsGroup}>
            <Statistic>
                <Statistic.Label>Points</Statistic.Label>
                <Statistic.Value className={styles.statisticsValue}>0</Statistic.Value>
            </Statistic>
            <Statistic>
                <Statistic.Label>RF Power</Statistic.Label>
                <Statistic.Value className={styles.statisticsValue}>-82 dBm</Statistic.Value>
            </Statistic>
            <Statistic>
                <Statistic.Label>GPS Accuracy</Statistic.Label>
                <Statistic.Value className={styles.statisticsValue}>11 m</Statistic.Value>
            </Statistic>
        </Statistic.Group>
    </Segment>
)

export default Statistics
