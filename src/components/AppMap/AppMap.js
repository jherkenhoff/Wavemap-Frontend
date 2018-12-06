import React from 'react'
import { Grid, Dimmer, Header, Icon, Button, Transition } from 'semantic-ui-react'
import { DataTable, Heatmap, SpectrumView, MapSetup, FilterSetup, PreprocessorSetup } from 'components'

import * as styles from './AppMap.less'

const AppMap = (props) => (
    <Grid padded className={styles.grid} stackable>
        <Grid.Row>
            <Grid.Column width={11} stretched>
                <Heatmap
                    data={props.data}
                    setMarker={props.setMarker}/>
            </Grid.Column>
            <Grid.Column width={5} className={styles.sidebar} stretched>
                <SpectrumView
                    setup={props.setup}
                    marker={props.marker}/>
                <MapSetup
                    active
                    datasets={props.datasets}
                    fetchData={props.fetchData}
                    setup={props.setup}
                    handleSelectDataset={props.handleSelectDataset}
                    handleSelectSubset={props.handleSelectSubset}
                    handleFilterChange={props.handleFilterChange}
                    handleDeleteFilter={props.handleDeleteFilter}
                    handleAddFilter={props.handleAddFilter}/>
                <FilterSetup
                    setup={props.setup}
                    handleToggleFilter={props.handleToggleFilter}
                    handleFilterChange={props.handleFilterChange}
                    handleDeleteFilter={props.handleDeleteFilter}
                    handleAddFilter={props.handleAddFilter}/>
                <PreprocessorSetup/>

                <div/>

                <Button.Group fluid className={styles.buttons}>
                    <Button disabled>Revert</Button>
                    <Button.Or/>
                    <Transition animation="jiggle" duration={500} visible={(props.setup.selectedDataset == undefined) || (props.setup.selectedSubset == undefined)}>
                        <Button
                            disabled={(props.setup.selectedDataset == undefined) || (props.setup.selectedSubset == undefined)}
                            positive onClick={() => props.fetchData(props.setup.selectedDataset, props.setup.selectedSubset)}>
                            Update
                        </Button>
                    </Transition>
                </Button.Group>
            </Grid.Column>
        </Grid.Row>
    </Grid>
)

export default AppMap
