import React, { Component } from "react";

import { connect } from "react-redux";
import { Route, withRouter, NavLink } from "react-router-dom";

import NavHeader from "component/NavHeader/NavHeader";
import Menu from "../Menu/Menu";
import Comment from "../Comment/Comment";
import Restanurant from "../Restanurant/Restanurant";

import "./Main.scss";
import "component/common.scss";

class Main extends Component {
		constructor(props) {
			super(props);

		}
		changeTab() {

		}
		renderTabs() {
			let tabs = this.props.tabs;
			return tabs.map((item) => {
				return (
					<NavLink activeClassName="active" 
						onClick={() => this.changeTab(item)} 
						replace={true} to={"/" + item.key} key={item.key} className="tab-item">
					{item.name}
					</NavLink>
					)
			})
		}
		// renderTabs() {
		// 	let tabs = this.props.tabs;
		// 	return tabs.map((item) => {
		// 		return (
		// 			<div 
		// 				onClick={() => this.changeTab(item)} 
		// 				key={item.key} className="tab-item">
		// 			{item.name}
		// 			</div>
		// 			)
		// 	})
		// }
	                // <Menu />
	                // <Comment />
	                // <Restanurant />
		render() {
			let poiName = this.props.poiInfo.poi_info ? this.props.poiInfo.poi_info.name : " ";
			return (
				<div className="detail">
					<NavHeader title={poiName} />
					<div className="tab-bar">{this.renderTabs()}</div>
	                        <Route exact path="/menu" component={Menu}/>
	                        <Route path="/comment" component={Comment}/>
	                        <Route path="/restanurant" component={Restanurant}/>
	                        {this.props.showChooseContent ? <div className="mask"></div> : null}                    
                    {this.props.showChooseContent ? <div className="mask"></div> : null}                    
				</div>
				);
		}
}

export default withRouter(connect(
		state => ({
			tabs: state.tabReducer.tabs,
			showChooseContent: state.menuReducer.showChooseContent,
			poiInfo: state.menuReducer.poiInfo
		})
	)(Main));
// export default connect(
// 		state => ({
// 			tabs: state.tabReducer.tabs,
// 			showChooseContent: state.menuReducer.showChooseContent,
// 			poiInfo: state.menuReducer.poiInfo
// 		})
// 	)(Main);