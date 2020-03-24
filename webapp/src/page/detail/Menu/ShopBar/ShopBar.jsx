import React, { Component } from "react";

import { connect } from "react-redux";

import { clearCar, showChoose,  addSelectItem, minusSelectItem } from "../../actions/menuAction";

import "./ShopBar.scss";

class ShopBar extends Component {
	/**
	 * 获取总价
	 */
	getTotalPrice() {
		let listData = this.props.listData.food_spu_tags || [];
		let totalPrice = 0;
		let dotNum = 0;
		let chooseList = [];

		for(let i = 0; i < listData.length; i ++) {
			let spus = listData[i].spus || [];

			for(let j = 0; j < spus.length; j ++) {
				let chooseCount = spus[j].chooseCount;

				if(chooseCount > 0) {
					dotNum += chooseCount;
					spus[j]._index = j;
					spus[j]._outIndex = i;
					chooseList.push(spus[j]);
					totalPrice += spus[j].min_price * chooseCount;
				}
			}
		}
		return {
			dotNum,
			totalPrice,
			chooseList
		}
	}
	/**
	 * 增加菜品数量
	 */
	addSelectItem(item) {
		this.props.dispatch(addSelectItem({
			index: item._index,
			outIndex: item._outIndex
		}));
	}
	/**
	 * 减少菜品数量
	 */
	minusSelectItem(item) {
		this.props.dispatch(minusSelectItem({
			index: item._index,
			outIndex: item._outIndex
		}));
	}
	/**
	 * 渲染选择列表
	 */
	 renderChooseItem(data) {
		let array = data.chooseList || [];

		return array.map((item, index) => {
			return (
				<div className="choose-item" key={index}>
					<div className="item-name">{item.name}</div>
					<div className="price">¥{item.min_price * item.chooseCount}</div>
					<div className="select-content">
						<div className="minus" onClick={() => this.minusSelectItem(item)}></div>
						<div className="count">{item.chooseCount}</div>
						<div className="plus" onClick={() => this.addSelectItem(item)}></div>
					</div>
				</div>
				)
		});
	 }
	/**
	 * 打开或隐藏购物车已选择列表
	 */
	openChooseContent() {
		let flag = this.props.showChooseContent;

		this.props.dispatch(showChoose({
			flag: !flag
		}));
	}
	/**
	 * 清空购物车
	 */
	clearCar() {
	 	this.props.dispatch(clearCar());
	 	this.props.dispatch(showChoose({
	 		flag: false
	 	}));
	 }
	render() {
		let shipping_fee = this.props.listData.poi_info ? this.props.listData.poi_info.shipping_fee : 0;
		let data = this.getTotalPrice();
		return (
			<div className="shop-bar">
				{this.props.showChooseContent ?
					<div className="choose-content">
						<div className="content-top">
							<div className="clear-car" onClick={() => this.clearCar()}>清空购物车</div>
						</div>
						{this.renderChooseItem(data)}
					</div> : null
				}
				<div className="bottom-content">
					<div className="shop-icon" onClick={() => this.openChooseContent()}>
						{data.dotNum > 0 ? <div className="dot-num">{data.dotNum}</div> : null}
					</div>
					<div className="price-content">
						<p className="total-price">¥{data.totalPrice}</p>
						<p className="other-price">另需配送&nbsp;¥{shipping_fee}</p>
						<div className="submit-btn">去结算</div>
					</div>
				</div>
			</div>
			)
	}
}

export default connect(
	state => ({
		listData: state.menuReducer.listData,
		showChooseContent: state.menuReducer.showChooseContent
	})
	)(ShopBar);