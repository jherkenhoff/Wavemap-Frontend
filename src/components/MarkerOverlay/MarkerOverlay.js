import React from 'react';
import { Segment } from 'semantic-ui-react'
import { Spectrum } from "components"
import TopCorner from "./TopCorner"

import * as styles from "./MarkerOverlay.less"

class MarkerOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.handleTopCornerClick = this.handleTopCornerClick.bind(this);

        this.state = {
            maximized: true
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

        const showSpectrum = sampleAvailable && this.state.maximized

        return (
            <div className={[styles.overlay, this.state.maximized? styles.maximized:undefined].join(" ")}>
                <TopCorner
                    width={70}
                    height={70}
                    padding={5}
                    onClick={this.handleTopCornerClick}
                    rect={!this.state.maximized}>
                    {this.state.maximized? "Hide":"Max"}
                </TopCorner>
                {this.state.maximized? <Spectrum spectrum={spectrum}/>:undefined}
            </div>
        );
    }
}

export default MarkerOverlay
