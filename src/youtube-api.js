"use strict";

class YoutubeApi {
    constructor() {
        this.url = "https://www.googleapis.com/youtube/v3/search?"
            + "type=video"
            + "&enablejsapi=1"
            + "&part=snippet"
            + "&videoEmbeddable=true"
            + "&iv_load_policy=3"
            + "&maxResults=50"
            + "&key=AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE";
    }

    search(q) {
        return fetch(this.url + "&q=" + q)
            .then(res => {
                return res.json();
            }).then(json => {
                let items = json.items;

                let videos = items.map(i => {
                    return {
                        id: i.id.videoId,
                        thumb: i.snippet.thumbnails.medium.url
                    };
                });

                return videos;
            });
    }
}

export default new YoutubeApi();
