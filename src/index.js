"use strict";

import React from "react";

class Index extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            q: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange (e) {
        this.setState({q: e.target.value});
    }

    handleSubmit (e) {
        e.preventDefault();

        let newURL = window.location.protocol + "//" + window.location.host + "/#/search/" + this.state.q;

        window.location = newURL;
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
                <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>

                <form
            onSubmit={this.handleSubmit}
            style={{height: "10%", width: "100%"}}>

                <input
            autoComplete="off"
            autoFocus
            id="q"
            onChange={this.onChange}
            placeholder="search"
            style={inputStyle}/>

                </form>

                </div>
        );
    }
}

export default Index;
