import { connect } from 'react-redux'
import { LiveSetup } from 'components'
import { addDataset, selectDataset } from 'actions'

const mapStateToProps = state => {
    return {
        deviceInfo: state.deviceInfo,
        datasets: state.datasets,
        selectedDataset: state.selectedDataset
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

const LiveSetupContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LiveSetup)

export default LiveSetupContainer
