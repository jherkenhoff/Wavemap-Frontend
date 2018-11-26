import React from 'react'
import { Grid } from 'semantic-ui-react'
import { DataTable, Heatmap, SpectrumView, MapSetup } from 'components'

import * as styles from './AppMap.less'

const AppMap = (props) => (
    <Grid padded className={styles.grid} stackable stretched>
        <Grid.Row>
            <Grid.Column width={11}>
                <Heatmap data={props.data}/>
            </Grid.Column>
            <Grid.Column width={5}>
                <SpectrumView filters={props.filters}/>
                <MapSetup
                    filters={props.filters}
                    datasets={props.datasets}
                    fetchData={props.fetchData}
                    handleFilterChange={props.handleFilterChange}
                    handleDeleteFilter={props.handleDeleteFilter}
                    handleAddFilter={props.handleAddFilter}/>
            </Grid.Column>
        </Grid.Row>
    </Grid>
)

export default AppMap
