import { connect } from 'react-redux'
import { App } from 'components'

const mapStateToProps = state => {
    return {
        connected: state.isConnected
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default AppContainer
