import { connect } from 'react-redux'
import { Header } from 'components'
import { changeFreqFilter, deleteFreqFilter, addFreqFilter, toggleFreqFilter, fetchData, fetchDatasets, selectDataset, setMarker, selectPreprocessor } from 'actions'

const mapStateToProps = state => {
    return {
        datasets: state.datasets,
        setup: state.newSetup,
        setupChanged: JSON.stringify(state.newSetup) !== JSON.stringify(state.currentSetup),
        loading: state.progress.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDatasets: () => {
            dispatch(fetchDatasets());
        },
        selectDataset: (selectedDataset, selectSubset) => {
            dispatch(selectDataset(selectedDataset, selectSubset));
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
        selectPreprocessor: (preprocessor) => {
            dispatch(selectPreprocessor(preprocessor));
        }
    }
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

export default HeaderContainer
