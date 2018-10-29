import React, { Component } from "react"
import { Map, TileLayer, Marker } from "react-leaflet"
import HeatmapLayer from "react-leaflet-heatmap-layer"
import { BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { Header, Menu, Dropdown, Icon, Label, Segment } from 'semantic-ui-react'
import * as styles from "./Heatmap.less"
import testData  from "./data.js"

const center = [53.07, 8.793]

class MapPreview extends Component {

    // HACK: forceUpdate() must be called after some time, otherwise the custom leaflet control
    // is not rendered..
    componentDidMount() {
        window.setTimeout(() => { this.forceUpdate() }, 100);
    }

    render() {
        var data = [];
        for (var i=1; i<=3+0.01; i+=0.01) {
            data.push({
                freq: (10**i).toPrecision(5),
                uv: (10*Math.log10(6e-9 + 1e-9 * Math.random())),
                pv: (10*Math.log10(6e-9 + 1e-9 * Math.random()))
            });
        }

        return (
                <Map center={center} zoom={16} className={styles.map}>
                    <HeatmapLayer
                        points={testData}
                        latitudeExtractor={m => m[0]}
                        longitudeExtractor={m => m[1]}
                        max={1.8}
                        blur={15}
                        radius={20}
                        intensityExtractor={m => parseFloat(m[2])}/>
                    <TileLayer
                      attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      opacity={0.8}
                    />

                    <Marker position={center} draggable={true}/>
                </Map>
        );
    }
}

export default MapPreview
