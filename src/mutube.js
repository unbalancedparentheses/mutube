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
            videoId: "",
            searching: true
        };

        Youtube.search(this.state.q).then(videos => {
            this.setState({
                videos: videos,
                videoN: 0,
                videoId: videos[0].id,
                searching: false
            });
            React.findDOMNode(this.refs.slider).focus();
        });

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.playVideoN = this.playVideoN.bind(this);
    }

    onKeyDown (event) {
        let key = event.which;
        let leftArrow = 37;
        let rightArrow = 39;
        let escape = 27;

        let videoN = this.state.videoN;
        let lastVideo = this.state.videos.length - 1;

        let newVideoN;
        let newVideoId;

        if (key === leftArrow) {
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
        } else if (key === rightArrow) {
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

        if (key === escape) {
            event.preventDefault();
            React.findDOMNode(this.refs.q).focus();
        }
    }

    onChange (e) {
        this.setState({q: e.target.value});
    }

    handleSubmit (e) {
        e.preventDefault();

        Youtube.search(this.state.q).then(videos => {
            this.setState({
                videos: videos,
                videoN: 0,
                videoId: videos[0].id
            });
            React.findDOMNode(this.refs.slider).focus();
        });
    }

    playVideoN(videoClickN) {
        this.setState({
            videoN: videoClickN,
            videoId: this.state.videos[videoClickN].id
        });
    }

    render () {
        let inputStyle = {
            boxSizing: "border-box",
            width: "100%",
            height: "100%",
            fontSize: "2em",
            textAlign: "center"
        };

        let videoAndSlider;
        if (this.state.searching) {
            videoAndSlider =
                <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                fontSize: "2em"
            }}
                >
                Searching
            </div>;
        } else {
            videoAndSlider = <div style={{height: "100%", width: "100%"}}>
                <Player videoId={this.state.videoId}/>
                <Slider onKeyDown={this.onKeyDown} clickFunction={this.playVideoN} ref="slider" videoN={this.state.videoN} videos={this.state.videos}/>
                </div>;
        }



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
            ref="q"
            style={inputStyle}
            value={this.state.q}
                />
                </form>

                <div style={{height: "90%"}}>
                {{videoAndSlider}}
            </div>

                </div>
        );
    }
}

MuTube.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default MuTube;
