import { connect } from 'react-redux'
import { AppMap } from 'components'
import { changeFreqFilter, deleteFreqFilter, addFreqFilter } from 'actions'

const mapStateToProps = state => {
    return {
        filters: state.mapState.filters
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
    }
}

const AppMapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppMap)

export default AppMapContainer
