import { connect } from 'react-redux'
import { Heatmap } from 'components'
import { setMarker } from 'actions'

const mapStateToProps = state => {
    return {
        data: state.data,
        marker: state.marker
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMarker: (data_index) => {
            dispatch(setMarker(data_index));
        }
    }
}

const HeatmapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Heatmap)

export default HeatmapContainer
