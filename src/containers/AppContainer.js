import { connect } from 'react-redux'
import { App } from 'components'
import { fetchDatasets } from "actions"

const mapStateToProps = state => {
    return {
        connected: state.isConnected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDatasets: () => dispatch(fetchDatasets())
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default AppContainer
