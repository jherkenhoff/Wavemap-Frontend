import React from 'react'
import { Grid } from 'semantic-ui-react'
import { DataTable, MapPreview, LiveSpectrum, Statistics, LiveSetup } from 'components'

import * as styles from './AppLive.less'

const AppLive = (props) => (

    <Grid padded className={styles.grid} stackable stretched>
        <Grid.Row>
            <Grid.Column width={4}>
                <LiveSetup
                    deviceInfo={props.deviceInfo}
                    datasets={props.datasets}
                    isConnected={props.isConnected}
                    selectedDataset={props.selectedDataset}
                    deviceSetup={props.deviceSetup}
                    isRunning={props.measurementStatus.isRunning}
                    onAddDataset={props.handleAddDataset}
                    onSelectDataset={props.handleSelectDataset}
                    onChangeMeasurementRunning={props.handleChangeMeasurementRunning}
                    handleStartSingleSample={props.handleStartSingleSample}
                />
            </Grid.Column>
            <Grid.Column width={6} >
                <Statistics/>
                <DataTable
                    isConnected={props.isConnected}
                    isRunning={props.measurementStatus.isRunning}
                    liveSamples={props.liveSamples}/>
            </Grid.Column>
            <Grid.Column width={6}>
                    <LiveSpectrum
                        isConnected={props.isConnected}
                        isRunning={props.measurementStatus.isRunning}
                        liveSamples={props.liveSamples}/>
                    <MapPreview
                        isConnected={props.isConnected}
                        isRunning={props.measurementStatus.isRunning}
                        liveSamples={props.liveSamples}/>
            </Grid.Column>
        </Grid.Row>
    </Grid>
)

export default AppLive
