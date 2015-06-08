"use strict";

import React from "react";

class Player extends React.Component {
    constructor (props) {
        super(props);

        let tag = document.createElement("script");

        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.loadPlayer = this.loadPlayer.bind(this);
    }

    componentDidMount () {
        document.onPlayerReady = event => {
            event.target.playVideo();
        };

        if (window.ytLoaded === true) {
            window.player = this.loadPlayer();
        } else {
            window.onYouTubePlayerAPIReady = () => {
                window.player = this.loadPlayer();
                window.ytLoaded = true;
            };
        }
    }

    loadPlayer() {
        return new YT.Player("player", {
            height: "100%",
            width: "100%",
            videoId: this.props.videoId,
            events: {
                "onReady": document.onPlayerReady
            }
        });
    }

    componentWillUpdate(nextProps) {
        if (!!window.player.loadVideoById) {
            window.player.loadVideoById(nextProps.videoId);
        }
    }

    shouldComponentUpdate (nextProps) {
        return nextProps.videoId !== this.props.videoId;
    }

    render() {
        return (
                <div style={{height: "80%", width: "100%", boxSizing: "border-box"}}>

                <div id="player"/>

                </div>
        );
    }
}

export default Player;
