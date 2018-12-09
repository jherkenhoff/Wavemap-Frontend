import React, { Component } from "react"
import { Map, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet";
import Control from 'react-leaflet-control';
import { MarkerOverlay } from "components"
import HexbinLayer from "./HexbinLayer"
import sphereKnn from "sphere-knn"
import * as styles from "./Heatmap.less"
import * as iconImage from "./icon.png"
import * as shadowImage from "./icon-shadow.png"

const center = [53.07, 8.793]

const myIcon = L.icon({
    iconUrl: iconImage,
    iconSize: [57, 45],
    iconAnchor: [35, 45],
    popupAnchor: [0, -50],
    shadowUrl: shadowImage,
    shadowSize: [57, 45],
    shadowAnchor: [35, 45]
});

class MapPreview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            markerPos: center
        }

        this.handleMarkerDragEnd = this.handleMarkerDragEnd.bind(this);
    }

    handleMarkerDragEnd(e) {
        var knnLookup = sphereKnn(this.props.data)
        var nearest = knnLookup(e.target._latlng.lat, e.target._latlng.lng, 1, 100)
        if (nearest.length != 0) {
            this.setState({
                markerPos: [nearest[0].lat, nearest[0].lon]
            })
            this.props.setMarker(nearest[0].id)
        } else {
            this.props.setMarker(undefined)
        }
    }

    normalizeSamples(samples) {
        if (samples.length == 0)
            return []
        let min = samples[0].value
        let max = samples[0].value

        for (let i = 1; i < samples.length; i++) {
            let v = samples[i].value;
            min = (v < min) ? v : min;
            max = (v > max) ? v : max;
        }

        return samples.map( (sample) => ({...sample, value: (sample.value - min)/(max-min)}))
    }

    render() {

        let normalizedSamples = this.normalizeSamples(this.props.data)

        const options = {
            colorScaleExtent: [0,1],
            colorRange: ['#A0E9FF', '#FF4100'],
            opacity: 1.0
        };

        return (
            <Map center={center} zoom={16} className={styles.map}>
                <TileLayer
                  attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                  //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  //url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  opacity={1.0}
                />

                <Marker
                    position={this.state.markerPos}
                    icon={myIcon}
                    draggable
                    autoPan
                    onDragend={this.handleMarkerDragEnd}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <HexbinLayer data={normalizedSamples} {...options} />
                <Control position="topright" >
                    <MarkerOverlay marker={this.props.marker}/>
                </Control>
            </Map>
        );
    }
}

export default MapPreview
