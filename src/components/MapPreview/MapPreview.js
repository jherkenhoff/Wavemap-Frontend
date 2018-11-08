import React, { Component } from "react"
import { Map, TileLayer, Marker, Circle } from "react-leaflet"
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

    var liveMarker = undefined
    var liveCircle = undefined
    if (props.liveSamples.length > 0) {
        var location = props.liveSamples[props.liveSamples.length - 1].location
        liveMarker = <Marker position={[location.lat, location.lon]}/>
        liveCircle = <Circle center={[location.lat, location.lon]} radius={location.accuracy}/>
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

                {liveMarker}
                {liveCircle}
            </Map>
        </Segment>
    )
}

export default MapPreview
