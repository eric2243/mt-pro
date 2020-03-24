import React, { Component } from "react";
import SearchBar from "./Search/Search";
import "./Header.scss";

class Header extends Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<div className = "header">
				<SearchBar/>
			</div>
			)
	}
}

export default Header;