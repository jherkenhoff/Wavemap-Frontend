import { connect } from 'react-redux'
import { AppMap } from 'components'
import { changeFreqFilter, deleteFreqFilter, addFreqFilter, toggleFreqFilter, fetchData, selectDataset, selectSubset, setMarker } from 'actions'

const mapStateToProps = state => {
    return {
        appState: state.appState,
        datasets: state.datasets,
        data: state.data,
        setup: state.setup,
        marker: state.marker
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleFilterChange: (id, min, max) => {
            dispatch(changeFreqFilter(id, min, max));
        },
        handleDeleteFilter: (id) => {
            dispatch(deleteFreqFilter(id));
        },
        handleAddFilter: (min, max) => {
            dispatch(addFreqFilter(min, max));
        },
        handleToggleFilter: (id) => {
            dispatch(toggleFreqFilter(id));
        },
        fetchData: (dataset_id, subset_id) => {
            dispatch(fetchData(dataset_id, subset_id));
        },
        handleSelectDataset: (dataset_id) => {
            dispatch(selectDataset(dataset_id));
        },
        handleSelectSubset: (subset_id) => {
            dispatch(selectSubset(subset_id));
        },
        setMarker: (data_index) => {
            dispatch(setMarker(data_index));
        }
    }
}

const AppMapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppMap)

export default AppMapContainer
