import React from 'react';

import * as styles from "./MarkerOverlay.less"

const TopCorner = (props) => {

    const { width, height, gap, padding, children } = props

    return (
        <div className={styles.topcorner}>
            <svg height={height} width={width}>
                <path fill="#f6f0f2" d={`M0,0L${width},0L${width},${height}L0,0`} />
                <path
                    fill="white"
                    d={`M${gap},0L${width},0L${width},${height-gap}L${gap},0`}
                    />
                <path
                    fill="transparent"
                    stroke="#ff6a88"
                    strokeWidth={1}
                    d={`M${gap+2.5*padding},${padding}L${width-padding},${padding}L${width-padding},${height-gap-2.5*padding}L${gap+2.5*padding},${padding}`}
                    />
                <text
                    fontFamily="Droid Sans Mono"
                    fill="#ff6a88"
                    textAnchor="middle"
                    transform={`translate(${width/2+gap+padding},${height/2-gap-padding})rotate(45)`}
                    >
                    {children}
                </text>

                <path fill="transparent" className={styles.clickable} d={`M0,0L${width},0L${width},${height}L0,0`} />
            </svg>
        </div>
    )
}

export default TopCorner
