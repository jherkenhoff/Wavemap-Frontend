import { connect } from 'react-redux'
import { AppMap } from 'components'
import { addDataset, selectDataset } from 'actions'

const mapStateToProps = state => {
    return {
        filters: state.mapState.filters
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

const AppMapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppMap)

export default AppMapContainer
