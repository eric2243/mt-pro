import React, { Component } from "react";

import { connect } from "react-redux";

import ListItem from "component/ListItem/ListItem";
import ScrollView from "component/ScrollView/ScrollView";

import { getListData } from "../actions/contentListAction";

import "./ContentList.scss";

/**
 * @constructor <ContentList />
 * @discription 附近商家列表
 */
class ContentList extends Component {
	constructor(props) {
		super(props);
		//请求第一屏数据
		this.fetchData();
	}
	onLoadPage() {
		//最多滚动三页
		if(this.props.page <= 3) {
			this.fetchData();
		}
	}

	fetchData() {
		this.props.dispatch(getListData({}));
	}

	renderItems() {
		let list = this.props.list;

		return list.map((item, index) => {
			return <ListItem key={index} itemData={item}></ListItem>
		});
	}

	render() {
		return (
			<div className="list-content">
				<ScrollView loadCallback={this.onLoadPage.bind(this)} isend={this.props.isend}>
					{this.renderItems()}
				</ScrollView>
			</div>
			);
	}
}

export default connect(
	state => ({
		list: state.contentListReducer.list,
		page: state.contentListReducer.page,
		isend: state.contentListReducer.isend
	})
	)(ContentList);