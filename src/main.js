"use strict";

import React from "react";
import Router from "react-router";

import Index from "./index";
import MuTube from "./mutube";

let DefaultRoute = Router.DefaultRoute;
let Link = Router.Link;
let Route = Router.Route;
let RouteHandler = Router.RouteHandler;

class App extends React.Component {
    render () {
        return (
                <div style={{
                    height: "100%",
                    width: "100%"
                }}>

                <RouteHandler/>

                </div>
        );
    }
}

let routes = (
        <Route handler={App} name="app" path="/">

        <DefaultRoute handler={Index}/>
        <Route handler={MuTube} path="/search/:q"/>

        </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});

export default App;
