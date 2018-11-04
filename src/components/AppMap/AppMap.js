import React from 'react'
import { Grid } from 'semantic-ui-react'
import { DataTable, Heatmap, SpectrumView, MapSetup } from 'components'

import * as styles from './AppMap.less'

const AppMap = (props) => (
    <Grid padded className={styles.grid} stackable stretched>
        <Grid.Row>
            <Grid.Column width={11}>
                <Heatmap/>
            </Grid.Column>
            <Grid.Column width={5}>
                <SpectrumView/>
                <MapSetup filters={props.filters}/>
            </Grid.Column>
        </Grid.Row>
    </Grid>
)

export default AppMap
