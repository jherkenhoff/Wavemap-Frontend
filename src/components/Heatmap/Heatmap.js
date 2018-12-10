import React, { Component } from "react"
import { Map, TileLayer, Marker, Popup } from "react-leaflet"
import { Transition } from 'semantic-ui-react'
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
        this.handleMapClick = this.handleMapClick.bind(this);
        this.findNearest = this.findNearest.bind(this);
    }

    handleMarkerDragEnd(e) {
        this.findNearest(e.target._latlng.lat, e.target._latlng.lng)
    }

    handleMapClick(e) {
        this.findNearest(e.latlng.lat, e.latlng.lng)
    }

    findNearest(lat, lng) {
        var knnLookup = sphereKnn(this.props.data)
        var nearest = knnLookup(lat, lng, 1, 500)
        if (nearest.length != 0) {
            this.props.setMarker(nearest[0].id)
            this.setState({
                markerPos: [nearest[0].lat, nearest[0].lon]
            })
        } else {
            this.props.setMarker(undefined)
            this.setState({
                markerPos: [lat, lng]
            })
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

        const normalizedSamples = this.normalizeSamples(this.props.data)
        const markerSet = (this.props.marker.sample != undefined)

        const options = {
            colorScaleExtent: [0,1],
            colorRange: ["#B5F12D", "#ea8342", 'red'],
            opacity: 1.0
        };

        return (
            <Map
                center={center}
                zoom={16}
                className={styles.map}
                onClick={this.handleMapClick}>
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
                    onDragend={this.handleMarkerDragEnd}/>
                <HexbinLayer data={normalizedSamples} {...options} />
                <Control position="topright">
                    <Transition animation="fade left" visible={markerSet} duration={500}>
                        <div>
                            <MarkerOverlay marker={this.props.marker} filters={this.props.filters}/>
                        </div>
                    </Transition>
                </Control>
            </Map>
        );
    }
}

export default MapPreview
