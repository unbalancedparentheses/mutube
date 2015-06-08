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

        let newURL = window.location.href + "search/" + this.state.q;
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
                    justifyContent: "center",
                    background: "radial-gradient(circle, transparent 20%, slategray 20%, slategray 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, slategray 20%, slategray 80%, transparent 80%, transparent) 50px 50px, linear-gradient(#A8B1BB 8px, transparent 8px) 0 -4px, linear-gradient(90deg, #A8B1BB 8px, transparent 8px) -4px 0",
                    backgroundColor: "slategray",
                    backgroundSize: "100px 100px, 100px 100px, 50px 50px, 50px 50px"
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
