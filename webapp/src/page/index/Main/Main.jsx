import React, { Component } from "react";
import Loadable from "react-loadable";
// import { Provider } from "react-redux";
import {  Route, withRouter } from "react-router-dom";
// import { ConnectedRouter } from "react-router-redux";
import { connect } from "react-redux";

// import { store, history } from "../store.js";
import BottomBar from "../BottomBar/BottomBar.jsx";
import Home from "../Home/Home.jsx";
// import Order from "../Order/Order";
// import My from "../My/My";
import Loading from "./Loading";

import "component/common.scss";

const Order = Loadable({
	loader: () => import (/*webpackChunkName: "order"*/"../Order/Order"),
	loading: Loading
});
const My = Loadable({
	loader: () => import (/*webpackChunkName: "my"*/"../My/My"),
	loading: Loading
});
class Main extends Component {
	constructor( props ) {
		super( props );
	};


	render() {
		return (
			<div>
				<Route exact path="/home" component={Home}/>
				<Route path="/order" component={Order}/>
				<Route path="/my" component={My}/>
				<BottomBar/>						
			</div>
		)
	};
}

export default withRouter(connect()(Main));