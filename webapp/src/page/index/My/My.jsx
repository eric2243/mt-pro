import React, { Component } from "react";

import "./My.scss";

class My extends Component {

	render() {
		return (
			<div className="my">
				<div className="header">
					<img className="avatar" src="http://i.waimai.meituan.com/static/img/default-avatar.png" alt=""/>
					<p className="nickname">美团小骑手&gt;</p>
				</div>
				<div className="content">
					<ul className="items">
						<li className="address">收货地址管理</li>
						<li className="money">商家代金券</li>
					</ul>
					<ul className="items">
						<li className="email">意见反馈</li>
						<li className="question">常见问题</li>
					</ul>
					<p className="tel">联系电话:&nbsp;13514874596</p>
					<p className="time">服务时间:&nbsp;9:00--23:00</p>
				</div>
			</div>
			);
	}
}

export default My;
