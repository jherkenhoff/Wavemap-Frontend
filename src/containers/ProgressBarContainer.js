import { connect } from 'react-redux'
import { ProgressBar } from 'components'

const mapStateToProps = state => {
    return {
        ...state.progress
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

const ProgressBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProgressBar)

export default ProgressBarContainer
