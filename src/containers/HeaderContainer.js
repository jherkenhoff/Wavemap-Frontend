import { connect } from 'react-redux'
import { Header } from 'components'

const mapStateToProps = state => {
    return {
        connected: state.isConnected,
        measurementStatus: state.measurementStatus
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
