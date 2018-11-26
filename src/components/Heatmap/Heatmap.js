import React, { Component } from "react"
import { Map, TileLayer, Marker } from "react-leaflet"
import HeatmapLayer from "react-leaflet-heatmap-layer"
import { BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { Header, Menu, Dropdown, Icon, Label, Segment } from 'semantic-ui-react'
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
        }
    }

    render() {
        return (
                <Map center={center} zoom={16} className={styles.map}>
                    <HeatmapLayer
                        fitBoundsOnLoad
                        points={this.props.data}
                        latitudeExtractor={m => m.lat}
                        longitudeExtractor={m => m.lon}
                        intensityExtractor={m => parseFloat(m.id)}
                        max={201}
                        blur={15}
                        minOpacity={0.5}
                        radius={20}/>
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
