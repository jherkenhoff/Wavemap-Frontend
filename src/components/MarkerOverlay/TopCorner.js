import React from 'react';

import * as styles from "./MarkerOverlay.less"

const TopCorner = (props) => {

    const { width, height, padding, children, rect } = props

    let morphPointX = rect? 0:width/2
    let morphPointY = rect? height:height/2

    let strokeMorphPointX = rect? morphPointX+padding:morphPointX+padding
    let strokeMorphPointY = rect? morphPointY-padding:morphPointY-padding

    return (
        <div className={styles.topcorner}>
            <svg height={height} width={width}>
                <path fill="white" d={`M0,0L${width},0L${width},${height}L${morphPointX},${morphPointY}L0,0`} />
                <path
                    fill="transparent"
                    stroke="#7E4B95"
                    strokeWidth={1}
                    d={`M${rect? padding:2.5*padding},${padding}L${width-padding},${padding}L${width-padding},${rect? height-padding:height-2.5*padding}L${strokeMorphPointX},${strokeMorphPointY}L${rect? padding:2.5*padding},${padding}`}
                    />
                <text
                    fontFamily="Droid Sans Mono"
                    fill="#7E4B95"
                    textAnchor="middle"
                    transform={`translate(${rect? width/2:width/2+padding+3},${rect? height/2+5:height/2-padding-3})rotate(${rect? 0:45})`}
                    >
                    {children}
                </text>

                <path
                    fill="transparent"
                    className={styles.clickable}
                    d={`M0,0L${width},0L${width},${height}L${morphPointX},${morphPointY}L0,0`}
                    onClick={props.onClick}/>
            </svg>
        </div>
    )
}

export default TopCorner
