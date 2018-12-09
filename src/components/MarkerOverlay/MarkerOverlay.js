import React from 'react';
import { Popup, Statistic, Transition } from 'semantic-ui-react'
import Resizable from "re-resizable"
import { Spectrum } from "components"
import TopCorner from "./TopCorner"

import * as styles from "./MarkerOverlay.less"

const minSpectrum = (arr) => Math.min(...arr.map(d => d.mag));
const maxSpectrum = (arr) => Math.max(...arr.map(d => d.mag));
const meanSpectrum = (arr) => {
    let sum = 0
    for (var i in arr) {
        sum += arr[i].mag
    }
    return sum/arr.length
}

class MarkerOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.handleTopCornerClick = this.handleTopCornerClick.bind(this);

        this.state = {
            maximized: true,
            width:500,
            height:300
        }
    }

    handleTopCornerClick() {
        this.setState({
            ...this.state,
            maximized: !this.state.maximized
        })
    }

    render() {
        let sample = this.props.marker.sample
        let sampleAvailable = (sample != undefined)
        let spectrum = sampleAvailable? sample.spectrum:undefined

        return (
            <div className={[styles.overlay, this.state.maximized? styles.maximized:undefined].join(" ")}>
                <TopCorner
                    width={70}
                    height={70}
                    padding={5}
                    onClick={this.handleTopCornerClick}
                    rect={!this.state.maximized}>
                    {this.state.maximized? "Hide":"Spectrum"}
                </TopCorner>
                <div className={styles.topbar}>
                    <div>
                        <div className={styles.title}>Marker</div>
                        <div className={styles.clock}>8.12.2018 17:54:23</div>
                    </div>
                    <Statistic.Group size="tiny" color="olive" inverted>
                        <Statistic>
                            <Statistic.Value>{sampleAvailable? minSpectrum(spectrum).toFixed(1):undefined}</Statistic.Value>
                            <Statistic.Label>Min</Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>{sampleAvailable? maxSpectrum(spectrum).toFixed(1):undefined}</Statistic.Value>
                            <Statistic.Label>Max</Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>{sampleAvailable? meanSpectrum(spectrum).toFixed(1):undefined}</Statistic.Value>
                            <Statistic.Label>Average</Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
                </div>
                {this.state.maximized?
                    <>
                        <Spectrum spectrum={spectrum}/>
                        <div className={styles.details}>
                            <table>
                                <thead>
                                    <tr>
                                        <td>
                                            Latitude
                                        </td>
                                        <td>
                                            Longitude
                                        </td>
                                        <td>
                                            Speed
                                        </td>
                                        <td>
                                            Satelites
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {sampleAvailable?
                                            <Popup
                                                position="top center"
                                                hoverable
                                                trigger={
                                                    <td>
                                                        {sample.lat}
                                                    </td>
                                                }
                                                content={sample.lat} />
                                            : <td>/</td>}
                                        {sampleAvailable?
                                            <Popup
                                                hoverable
                                                position="top center"
                                                trigger={
                                                    <td>
                                                        {sample.lon}
                                                    </td>
                                                }
                                                content={sample.lon} />
                                            : <td>/</td>}
                                        <td>{sampleAvailable? sample.speed.toFixed(2) + " km/h" : "/"}</td>
                                    <td>{sampleAvailable? sample.sats : "/"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                :undefined}
            </div>
        );
    }
}

export default MarkerOverlay
