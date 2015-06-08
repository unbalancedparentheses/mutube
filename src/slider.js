"use strict";

import React from "react";

class Slider extends React.Component{

    constructor(props) {
        super(props);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onKeyDown (event) {
        let key = event.which;
        let leftArrow = 37;
        let rightArrow = 39;
        let escape = 27;

        let videoN = this.props.videoN;
        let lastVideo = this.props.videos.length - 1;

        let newVideoN;

        if (key === leftArrow) {
            if (videoN === 0) {
                newVideoN = lastVideo;
            } else {
                newVideoN = videoN - 1;
            }
            this.props.playVideo(newVideoN);
        } else if (key === rightArrow) {
            if (videoN === lastVideo) {
                newVideoN = 0;
            } else {
                newVideoN = videoN + 1;
            }
            this.props.playVideo(newVideoN);
        }

        if (key === escape) {
            event.preventDefault();
            this.props.focusQ();
        }
    }

    handleClick(videoClickN) {
        this.props.playVideo(videoClickN);
    }

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
                <div
            id="slider"
            onKeyDown={this.onKeyDown}
            style={{height: "20%"}}
            tabIndex="0">
                {
                    styles.map(s => {
                        return (<div key={s.id}
                                onClick={this.handleClick.bind(this, s.id)}
                                style={s.data}/>);
                    })
                }
            </div>
        );
    }
}

export default Slider;
