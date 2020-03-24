import React, { Component } from "react";

import { connect } from "react-redux";

import StarScore from "component/StarScore/StarScore";

import "./CommentItem.scss";

class CommentItem extends Component {
	renderImgs(item) {
		let imgs = item.comment_pics || [];

		if(imgs.length) {
			return (
				<div className="img-content clearfix">
					{
						imgs.map((item, index) => {
							let src = item.url;
							let style = {
								backgroundImage: "url(" + src + ")"
							}
							return <div key={index} className={"img-item"} style={style}></div>
						})
					}
				</div>
				)
		}else {
			return null;
		}
	}
	renderTags(label) {
		return label.map((item) => {
			return item.content + "，";
		});
	}
	formatTime(time) {
		let date = new Date(Number(time + "000"));

		return date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
	}
	render() {
		let item = this.props.data;
		return (
			<div className="comment-item">
				<div className="comment-time">{this.formatTime(item.comment_time)}</div>
				<img src={item.user_pic_url || 
					"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/290px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg"} 
					alt="avatar" className="avatar"
				/>
				<div className="item-right">
					<p className="nickname">{item.user_name}</p>
					<div className="star-and-time">
						<div className="star-content">
							<StarScore score={item.order_comment_score}></StarScore>
						</div>
						<div className="send-time">{item.ship_time + "分钟送达"}</div>
					</div>
					<div className="comment-text">{item.comment}</div>
					{this.renderImgs(item)}
					{item.praise_food_tip ? <div className="like-info">{item.praise_food_tip}</div> : null}
					{item.comment_labels.length ? <div className="tag-info">{this.renderTags(item.comment_labels)}</div> : null}
				</div>
			</div>
			);
	}
}

export default connect()(CommentItem);