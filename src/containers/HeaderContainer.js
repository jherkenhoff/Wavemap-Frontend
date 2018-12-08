import { connect } from 'react-redux'
import { Header } from 'components'
import { changeFreqFilter, deleteFreqFilter, addFreqFilter, toggleFreqFilter, fetchData, selectDataset, selectSubset, setMarker } from 'actions'

const mapStateToProps = state => {
    return {
        datasets: state.datasets,
        setup: state.setup,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleSelectDataset: (dataset_id) => {
            dispatch(selectDataset(dataset_id));
        },
        handleSelectSubset: (subset_id) => {
            dispatch(selectSubset(subset_id));
        },
        fetchData: () => {
            dispatch(fetchData());
        },
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
    }
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

export default HeaderContainer
