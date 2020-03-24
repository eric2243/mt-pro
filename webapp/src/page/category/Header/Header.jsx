import React, { Component } from "react";
import { connect } from "react-redux";

import { TABKEY } from "../config.js";
import { changeTab,  getFilterData, changeFilter } from "../actions/headerActions";
import { getListData } from "../actions/contentListAction";

import "./Header.scss";

class Header extends Component {
	constructor(props) {
		super(props);
		this.fetchData();
	}
	fetchData() {
		this.props.dispatch(getFilterData());
	}
	/**
	 * 点击切换Tab
	 */
	changeTab(key) {
		let closePanel = false;
		//如果前后点击的是一个Tab，就关闭pannel
		if(this.props.activeKey === key && !this.props.closePanel) {
			closePanel = true;
		}
		this.props.dispatch(changeTab({
			activeKey: key,
			closePanel: closePanel
		}));
	}
	/**
	 * 渲染顶部默认Tab
	 */
	renderTabs() {
		let tabs = this.props.tabs;
		let array = [];

		for(let key in tabs) {
			let item = tabs[key];
			let cls = item.key + " item";
			if(item.key === this.props.activeKey && !this.props.closePanel) {
				cls += " current";
			}
			array.push(
				<div className={cls} key={item.key} onClick={() => {this.changeTab(item.key)}}>
					{item.text}
				</div>
				);
		}
		return array;
	}
	/**
	 * 取消之前其他item的状态
	 */
	 revertActive(key, dataList) {
	 	if(key === TABKEY.cate) {
			for(let i = 0; i < dataList.length; i ++) {
				for(let j = 0; j < dataList[i].sub_category_list.length; j ++) {
					dataList[i].sub_category_list[j].active = false;
				}
			}
	 	}else if(key === TABKEY.type) {
	 		for(let k = 0; k < dataList.length; k ++) {
	 			dataList[k].active = false;
	 		}
	 	}else {
	 		for(let x = 0; x < dataList.length; x ++) {
	 			for(let o = 0; o < dataList[x].length; o ++) {
	 				dataList[x].item[o].active = false;
	 			}
	 		}
	 	}
	 }
	/**
	 * 变换当前点击的item状态,同时发起filter请求
	 */
	 changeDoFilter(item, key, dataList) {
	 	this.revertActive(key, dataList);
	 	item.active = true;
	 	this.props.dispatch(changeFilter({
	 		item,
	 		key
	 	}));
	 	this.props.dispatch(getListData({
	 		filterData: item,
	 		toFirstPage: true
	 	}));
	 }
	 /**
	  * 渲染内部的每个类目
	  */
	  renderFilterInnerContent(items, filterList) {
	  	return items.map((item, index) => {
	  		let cls = item.icon ? "cate-box-inner has-icon" : "cate-box-inner";

	  		if(item.active) {
	  			cls += " active";
	  		}
	  		return (
	  			<div key={index} className="cate-box" onClick={() => this.changeDoFilter(item, TABKEY.filter, filterList)}>
	  				<div clearfix={cls}>{item.icon ? <img src={item.icon} alt=""/> : null}{item.name}</div>
	  			</div>
	  			)
	  	});
	  }
	 /**
	  * 筛选外面类目
	  */
	  renderFilterContent() {
	  	let filterList = this.props.filterData.activity_filter_list || [];

	  	return filterList.map((item, index) => {
	  		return (
	  			<li className="filter-item" key={index}>
	  				<p className="filter-title">{item.group_title}</p>
	  				<div className="item-content clearfix">{this.renderFilterInnerContent(item.items, filterList)}</div>
	  			</li>
	  			)
	  	});
	  }
	/**
	 * 综合排序类目
	 */
	 renderTypeContent() {
	 	let typeList = this.props.filterData.sort_type_list || [];
	 	return typeList.map((item, index) => {
	 		let cls = item.active ? "type-item active" : "type-item";

	 		return (
	 			<li onClick={() => this.changeDoFilter(item, TABKEY.type, typeList)} key={index} className={cls}>
		 			{item.name}
	 			</li>
	 			);
	 	})
	 }
	/**
	 * 全部分类里面的每个条目
	 */
	 renderCateInnerContent(items, cateList) {
		return items.sub_category_list.map((item, index) => {
			let cls = item.active ? "cate-box-inner active" : "cate-box-inner";
			return (
				<div key={index} onClick={() => this.changeDoFilter(item, TABKEY.cate, cateList)} className="cate-box">
					<div className={cls}>{item.name}({item.quantity})</div>
				</div>
				)
		});
	 }
	 /**
	  * 全部分类外内目
	  */
	  renderCateContent() {
	  	let cateList = this.props.filterData.category_filter_list || [];

	  	return cateList.map((item, index) => {
	  		return (
	  			<li className="cate-item" key={index}>
		  			<p className="item-title">{item.name}
		  				<span className="item-count">{item.quantity}</span>
		  			</p>
	  				<div className="item-content clearfix">{this.renderCateInnerContent(item, cateList)}</div>
	  			</li>
	  			)
	  	}) 
	  }
	/**
	 * 渲染过滤面板
	 */
	 renderContent() {
	 	let tabs = this.props.tabs;
	 	let array = [];

	 	for(let key in tabs) {
	 		let item = tabs[key];
	 		let cls = item.key + "-panel";
	 		if(item.key === this.props.activeKey) {
	 			cls += " current";
	 		}
			if(item.key === TABKEY.cate) {
				array.push(
					<ul key={item.key} className={cls}>
						{this.renderCateContent()}
					</ul>
					);
			}else if(item.key === TABKEY.type) {
				array.push(
					<ul key={item.key} className={cls}>
						{this.renderTypeContent()}
					</ul>
					);
			}else if(item.key === TABKEY.filter) {
				array.push(
					<ul key={item.key} className={cls}>
						{this.renderFilterContent()}
					</ul>
					);
			}
	 	}
	 	return array;
	 }
	render() {
			let cls = "panel";
			if(!this.props.closePanel) {
				cls += " show";
			}else {
				cls = "panel";
			}
	return (
		<div className="header">
			<div className="header-top">{this.renderTabs()}</div>
			<div className={cls}>
				<div className="panel-inner">
					{this.renderContent()}
				</div>
			</div>
		</div>
		)
	}
}

export default connect(
	state => ({
			tabs: state.headerReducer.tabs,
			activeKey: state.headerReducer.activeKey,
			closePanel: state.headerReducer.closePanel,
			filterData: state.headerReducer.filterData
	})
	)(Header);