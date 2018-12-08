import React from 'react';
import { Segment } from 'semantic-ui-react'
import { Spectrum } from "components"
import TopCorner from "./TopCorner"

import * as styles from "./MarkerOverlay.less"

class MarkerOverlay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let sample = this.props.marker.sample
        let sampleAvailable = (sample != undefined)
        let spectrum = sampleAvailable? sample.spectrum:undefined

        return (
            <div className={styles.overlay}>
                <TopCorner width={70} height={70} gap={5} padding={5}>
                    Hide
                </TopCorner>
                {sampleAvailable? <Spectrum data={spectrum}/>:undefined}
            </div>
        );
    }
}

export default MarkerOverlay
