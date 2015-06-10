"use strict";

import React from "react";

import Slider from "./slider";
import Player from "./player";

import Youtube from "./youtube-api";


class MuTube extends React.Component {
    constructor (props, context) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.playVideo = this.playVideo.bind(this);
        this.focusQ = this.focusQ.bind(this);
        this.searchYoutube = this.searchYoutube.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

        var q = context.router.getCurrentParams().q;

        this.state = {
            q: q,
            videos: [],
            videoN: 0,
            videoId: "",
            searching: true,
            enoughResults: false
        };

        this.searchYoutube();
    }

    onKeyDown (event) {
        let key = event.which;
        let escape = 27;

        if (key === escape) {
            event.preventDefault();
            React.findDOMNode(this.refs.slider).focus();
        }
    }

    focusQ() {
        React.findDOMNode(this.refs.q).focus();
        React.findDOMNode(this.refs.q).select();
    }

    onChange (e) {
        this.setState({q: e.target.value});
    }

    handleSubmit (e) {
        e.preventDefault();
        this.searchYoutube();
    }

    searchYoutube () {
        Youtube.search(this.state.q).then(videos => {
            if (videos.length < 5) {
                this.setState({
                    searching: false,
                    enoughResults: false
                });
            } else {
                this.setState({
                    videos: videos,
                    videoN: 0,
                    videoId: videos[0].id,
                    searching: false,
                    enoughResults: true
                });

                React.findDOMNode(this.refs.slider).focus();
            }
        });
    }

    playVideo(videoN) {
        this.setState({
            videoN: videoN,
            videoId: this.state.videos[videoN].id
        });
    }

    render () {
        let videoAndSlider;

        if (this.state.searching) {
            videoAndSlider =
                (<div style={{display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                              fontSize: "2em"}}>
                 <div className="spinner-loader"></div>
                 </div>);
        } else if (!this.state.searching && !this.state.enoughResults) {
            videoAndSlider = (<div style={{display: "flex",
                                           alignItems: "center",
                                           justifyContent: "center",
                                           height: "100%",
                                           fontSize: "2em"}}>
                              No results found
                              </div>);
        } else {
            videoAndSlider = (
                    <div style={{height: "100%", width: "100%"}}>

                    <Player videoId={this.state.videoId}/>

                    <Slider focusQ={this.focusQ} playVideo={this.playVideo} ref="slider"
                videoN={this.state.videoN} videos={this.state.videos}/>
                    </div>);
        }

        return (
                <div id="container" style={{height: "100%"}}>

                <form onSubmit={this.handleSubmit} style={{height: "10%"}}>
                <input autoComplete="off" autoFocus id="q" onChange={this.onChange}
            onKeyDown={this.onKeyDown} placeholder="search" ref="q"
            style={{boxSizing: "border-box",
                    width: "100%",
                    height: "100%",
                    fontSize: "2em",
                    textAlign: "center"}}
            value={this.state.q}/>
                </form>

                <div style={{height: "90%"}}> {{videoAndSlider}} </div>

                </div>
        );
    }
}

MuTube.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default MuTube;
