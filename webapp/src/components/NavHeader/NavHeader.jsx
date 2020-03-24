import React, { Component } from "react";

import "./NavHeader.scss";

/**
 * @constructor <NavHeader titile={string}/>
 * @description 导航栏
 */
class NavHeader extends Component {
	goBack() {
		window.history.back();
	}
	render() {
		return (
			<div className="nav">
				<div className="back-icon" onClick={() => this.goBack()}></div>
				<h4 className="title">{this.props.title}</h4>
			</div>
			);
	}
}

export default NavHeader;