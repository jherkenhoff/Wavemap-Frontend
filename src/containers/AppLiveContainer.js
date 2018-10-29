import { connect } from 'react-redux'
import { AppLive } from 'components'
import { addDataset, selectDataset, measurementControl } from 'actions'

const mapStateToProps = state => {
    return {
        deviceInfo: state.deviceInfo,
        datasets: state.datasets,
        isConnected: state.isConnected,
        selectedDataset: state.selectedDataset,
        deviceSetup: state.deviceSetup,
        measurementStatus: state.measurementStatus
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

const AppLiveContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppLive)

export default AppLiveContainer
