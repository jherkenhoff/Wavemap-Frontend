import { connect } from 'react-redux'
import { AppMap } from 'components'
import { addDataset, selectDataset } from 'actions'

const mapStateToProps = state => {
    return {
        deviceInfo: state.deviceInfo,
        datasets: state.datasets,
        isConnected: state.isConnected,
        selectedDataset: state.selectedDataset,
        deviceSetup: state.deviceSetup
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddDataset: (e, {value}) => {
            dispatch(addDataset(value))
        },
        onSelectDataset: (e, {value}) => {
            dispatch(selectDataset(value))
        },
    }
}

const AppMapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppMap)

export default AppMapContainer
