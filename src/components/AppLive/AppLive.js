import React from 'react'
import { Grid } from 'semantic-ui-react'
import { DataTable, MapPreview, SpectrumView, Statistics } from 'components'
import { LiveSetupContainer } from 'containers'

import * as styles from './AppLive.less'

const AppLive = () => (
    <Grid padded relaxed className={styles.grid} stackable stretched>
        <Grid.Row>
            <Grid.Column width={4}>
                <LiveSetupContainer/>
            </Grid.Column>
            <Grid.Column width={6} >
                <Statistics/>
                <DataTable/>
            </Grid.Column>
            <Grid.Column width={6}>
                    <SpectrumView/>
                    <MapPreview/>
            </Grid.Column>
        </Grid.Row>
    </Grid>
)

export default AppLive
