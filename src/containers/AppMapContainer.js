import { connect } from 'react-redux'
import { AppMap } from 'components'
import { changeFreqFilter, deleteFreqFilter, addFreqFilter, fetchData } from 'actions'

const mapStateToProps = state => {
    return {
        filters: state.filters,
        datasets: state.datasets,
        data: state.data
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
        fetchData: (dataset_id, subset_id) => {
            dispatch(fetchData(dataset_id, subset_id));
        },
    }
}

const AppMapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppMap)

export default AppMapContainer
