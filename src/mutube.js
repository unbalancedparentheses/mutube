"use strict";

import React from "react";

import Slider from "./slider";
import Player from "./player";

import Youtube from "./youtube-api";


class MuTube extends React.Component {
    constructor (props, context) {
        super(props);

        var q = context.router.getCurrentParams().q;

        this.state = {
            q: q,
            videos: [],
            videoN: 0,
            videoId: ""
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentDidMount () {
        document.getElementById("slider").contentEditable = true;
        window.slider.addEventListener("keydown", this.onKeyDown);

        Youtube.search(this.state.q).then(videos => {
            this.setState({
                videos: videos,
                videoN: 0,
                videoId: videos[0].id
            });
        });
    }

    onKeyDown (event) {
        let key = event.which;

        let videoN = this.state.videoN;
        let lastVideo = this.state.videos.length - 1;

        let newVideoN;
        let newVideoId;

        if (key === 37) {
            if (videoN === 0) {
                newVideoN = lastVideo;
                newVideoId = this.state.videos[lastVideo].id;

            } else {
                newVideoN = videoN - 1;
                newVideoId = this.state.videos[videoN - 1].id;
            }

            this.setState({
                videoN: newVideoN,
                videoId: newVideoId
            });
        } else if (key === 39) {
            if (videoN === lastVideo) {
                newVideoN = 0;
                newVideoId = this.state.videos[0].id;
            } else {
                newVideoN = videoN + 1;
                newVideoId = this.state.videos[this.state.videoN + 1].id;
            }

            this.setState({
                videoN: newVideoN,
                videoId: newVideoId
            });
        }
    }

    onChange (e) {
        this.setState({q: e.target.value});
    }

    handleSubmit (e) {
        e.preventDefault();

        Youtube.search(this.state.q).then(videos => {
            console.log(videos);

            this.setState({
                videos: videos,
                videoN: 0,
                videoId: videos[0].id
            });
        });

        document.getElementById("q").blur();
    }

    render () {
        let inputStyle = {
            boxSizing: "border-box",
            width: "100%",
            height: "100%",
            fontSize: "2em",
            textAlign: "center"
        };

        return (
                <div id="container" style={{height: "100%"}}>

                <form
            onSubmit={this.handleSubmit}
            style={{height: "10%"}}
                >
                <input
            autoComplete="off"
            autoFocus
            id="q"
            onChange={this.onChange}
            placeholder="search"
            style={inputStyle}
            value={this.state.q}
                />
                </form>

                <Player videoId={this.state.videoId}/>
                <Slider videoN={this.state.videoN} videos={this.state.videos}/>

                </div>
        );
    }
}

MuTube.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default MuTube;
