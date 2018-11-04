import { connect } from 'react-redux'
import { AppLive } from 'components'
import { addDataset, selectDataset, changeMeasurementRunning } from 'actions'

const mapStateToProps = state => {
    var liveState = state.liveState
    return {
        deviceInfo: liveState.deviceInfo,
        datasets: liveState.datasets,
        isConnected: liveState.isConnected,
        selectedDataset: liveState.selectedDataset,
        deviceSetup: liveState.deviceSetup,
        measurementStatus: liveState.measurementStatus
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleAddDataset: (e, {value}) => {
            dispatch(addDataset(value))
        },
        handleSelectDataset: (e, {value}) => {
            dispatch(selectDataset(value))
        },
        handleChangeMeasurementRunning: (value) => {
            dispatch(changeMeasurementRunning(value))
        }
    }
}

const AppLiveContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppLive)

export default AppLiveContainer
