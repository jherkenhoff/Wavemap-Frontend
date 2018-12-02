import React, { Component } from "react"
import { Map, TileLayer, Marker } from "react-leaflet"
import HeatmapLayer from "react-leaflet-heatmap-layer"
import { BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { Header, Menu, Dropdown, Icon, Label, Segment, Dimmer } from 'semantic-ui-react'
import sphereKnn from "sphere-knn"
import * as styles from "./Heatmap.less"
import testData  from "./data.js"

const center = [53.07, 8.793]

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

        return (
            <Map center={center} zoom={16} className={styles.map}>
                <HeatmapLayer
                    points={normalizedSamples}
                    latitudeExtractor={m => m.lat}
                    longitudeExtractor={m => m.lon}
                    intensityExtractor={m => m.value}
                    radius={10}
                    blur={10}
                    maxZoom={10}
                    max={1.0}
                    gradient={{0.0: "green", 0.5:"yellow", 1.0:"red"}}/>
                <TileLayer
                  attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  opacity={0.8}
                />

                <Marker position={this.state.markerPos} draggable autoPan onDragend={this.handleMarkerDragEnd}/>
            </Map>
        );
    }
}

export default MapPreview
