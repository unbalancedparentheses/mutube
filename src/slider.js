"use strict";

import React from "react";

class Slider extends React.Component{
    render () {
        let videoN = this.props.videoN;

        let firstVideo = 5 * Math.floor(videoN / 5);

        let styles = [];
        let i;

        for (i = firstVideo; i < firstVideo + 5; i++) {
            let thumb;

            if (this.props.videos[0]) {
                thumb = this.props.videos[i].thumb;
            } else {
                thumb = "";
            }

            let style = {
                backgroundSize: "cover",
                backgroundImage: "url(" + thumb + ")",
                height: "100%",
                width: "20%",
                float: "left"
            };

            if (i === videoN) {
                style.boxShadow = "inset 0px 0px 0px 5px #f00";
            } else {
                style.WebkitFilter = "grayscale(100%)";
            }

            styles.push({
                "id": i,
                "data": style
            });
        }

        return (
                <div id="slider" style={{height: "15%"}}>
                {
                    styles.map(s => {
                        return <div key={s.id} style={s.data}/>;
                    })
                }
            </div>
        );
    }
}

export default Slider;
