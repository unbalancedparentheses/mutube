"use strict";

import React from "react";

class Slider extends React.Component{
    constructor (props) {
        super(props);

        this.state = {
            width: 0
        };

        this.onKeyDown = this.onKeyDown.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
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

    updateDimensions () {
        this.setState({width: window.innerWidth});
    }

    componentWillMount () {
        this.updateDimensions();
    }

    componentDidMount () {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount () {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render () {
        let numberOfVideos;

        if (this.state.width < 640) {
            numberOfVideos = 2;
        } else if (this.state.width < 1024) {
            numberOfVideos = 3;
        } else {
            numberOfVideos = 5;
        }

        let firstVideo = numberOfVideos * Math.floor(this.props.videoN / numberOfVideos);

        let styles = [];
        let i;

        for (i = firstVideo; (i < firstVideo + numberOfVideos); i++) {
            let thumb;

            if ( i < this.props.videos.length) {
                thumb = this.props.videos[i].thumb;
            } else {
                thumb = this.props.videos[i - this.props.videos.length].thumb;
            }

            let style = {
                backgroundSize: "cover",
                backgroundImage: "url(" + thumb + ")",
                height: "100%",
                width: "calc(100% / " + numberOfVideos + ")",
                float: "left"
            };

            if (i === this.props.videoN) {
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
