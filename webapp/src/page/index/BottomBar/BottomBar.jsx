import React, { Component } from "react";
import { connect } from "react-redux";
// import { changeTab } from "../actions/tabAction.js"
import { NavLink, withRouter } from "react-router-dom";

import "./sass/BottomBar.scss";

class BottomBar extends Component {
	constructor( props ) {
		super( props );
	}

	changeTab( item ) {
		this.props.history.replace(item.key);
		// this.props.dispatch( changeTab( {
		// 	activeKey: item.key
		// } ) );
	}
	renderItem() {
		let tabs = this.props.tabs;

		return tabs.map( ( item, index ) => {
			let cls = item.key + " btn-item";
			let name = item.name;

			return ( 
				<NavLink key={index} className={cls} replace={true} to={"/" + item.key}
				activeClassName="active" onClick={() => this.changeTab(item)}>
					<div className = "tab-icon"></div>
					<div className = "btn-name">{ name }</div>
				</NavLink>
			)
		} );
	}
	render() {
		return (
			<div className = "btn-bar">
				{ this.renderItem() }
			</div>
		)
	}
}

export default withRouter(connect( 
	state => ( {
		tabs: state.tabReducer.tabs,
		activeKey: state.tabReducer.activeKey
	} )
)( BottomBar ));