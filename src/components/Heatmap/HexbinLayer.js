import L from "leaflet";
import { MapLayer, withLeaflet } from "react-leaflet"
import "@asymmetrik/leaflet-d3";

class HexbinLayer extends MapLayer {

    createLeafletElement(props) {
        let leafletElement = L.hexbinLayer(props)
        leafletElement.lat( (d,i) => d.lat)
        leafletElement.lng( (d,i) => d.lon)
        leafletElement.colorValue( (arr) => {
            let values = arr.map( d => d.o.value)
            let sum = values.reduce( (acc, v) => acc + v )
            return sum / arr.length
            // let sum = values.reduce( (acc, v) => Math.min(acc, v) )
            // return sum
        })
        return leafletElement
    }

    componentDidMount() {
        const { layerContainer } = this.props.leaflet;
        const { data } = this.props;
        this.leafletElement.addTo(layerContainer);
        if (data.length) this.leafletElement.data(data);
    }

    componentDidUpdate() {
        const { data } = this.props;
        if (data.length) this.leafletElement.data(data);
    }

    componentWillUnmount() {
        const { layerContainer, map } = this.props.leaflet;
        this.leafletElement.data(null);
        map.removeLayer(this.leafletElement);
        layerContainer.removeLayer(this.leafletElement);
    }

    render() {
        return null;
    }
}

export default withLeaflet(HexbinLayer)
