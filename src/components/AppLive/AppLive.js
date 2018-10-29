import React from 'react'
import { Grid } from 'semantic-ui-react'
import { DataTable, MapPreview, LiveSpectrum, Statistics } from 'components'
import { LiveSetupContainer } from 'containers'

import * as styles from './AppLive.less'

const AppLive = (props) => (

    <Grid padded className={styles.grid} stackable stretched>
        <Grid.Row>
            <Grid.Column width={4}>
                <LiveSetupContainer/>
            </Grid.Column>
            <Grid.Column width={6} >
                <Statistics/>
                <DataTable isConnected={props.isConnected} isRunning={props.measurementStatus.isRunning}/>
            </Grid.Column>
            <Grid.Column width={6}>
                    <LiveSpectrum isConnected={props.isConnected} isRunning={props.measurementStatus.isRunning}/>
                    <MapPreview isConnected={props.isConnected} isRunning={props.measurementStatus.isRunning}/>
            </Grid.Column>
        </Grid.Row>
    </Grid>
)

export default AppLive
