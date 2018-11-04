import { connect } from 'react-redux'
import { Header } from 'components'

const mapStateToProps = state => {
    return {
        connected: state.liveState.isConnected,
        measurementStatus: state.liveState.measurementStatus
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

export default HeaderContainer
