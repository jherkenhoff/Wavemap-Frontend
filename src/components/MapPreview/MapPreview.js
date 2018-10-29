import React, { Component } from "react"
import { Map, TileLayer, Marker } from "react-leaflet"
import { BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { Header, Menu, Dropdown, Icon, Label, Segment } from 'semantic-ui-react'
import * as styles from "./MapPreview.less"

const center = [53.07, 8.793]


const MapPreview = (props) => {

    var segmentColor
    if (!props.isConnected) {
        segmentColor="orange"
    } else if (props.isRunning) {
        segmentColor="green"
    }

    return (
        <Segment className={styles.mapSegment} color={segmentColor}>
            <Header as="h3">Map preview</Header>
            <Map center={center} zoom={16} className={styles.map}>
                <TileLayer
                  attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  opacity={0.8}
                />

                <Marker position={[53.071609, 8.793310]}/>
            </Map>
        </Segment>
    )
}

export default MapPreview
