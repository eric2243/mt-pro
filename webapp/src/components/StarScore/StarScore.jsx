import React, { Component } from "react";

import "./StarScore.scss";

/**
 * StarScore组件
 * @description <StarScore score = { num } />
 */
class StarScore extends Component {
	/**
	 * 渲染五颗星得分方法
	 * @param{ * } data
	 */
	renderScore() {
		let wm_poi_score = this.props.score || "";
		let score = wm_poi_score.toString();
		let scoreArray = score.split( "." );
		//满星个数
		let fullStar = parseInt( scoreArray[0] );
		//半星个数
		let halfStar = parseInt( scoreArray[1] ) >= 5 ? 1 : 0;
		//0星个数
		let nullStar = 5 - fullStar - halfStar;
		let starjsx = [];

		//渲染满星个数
		for( let i = 0; i < fullStar; i ++ ) {
			starjsx.push( <div key = { i + "full" } className = "star fullstar"></div> )
		}
		//渲染半星个数
		if( halfStar ) {
			for( let j = 0; j < halfStar; j ++ ) {
				starjsx.push( <div key = { j + "half" } className = "star halfstar"></div>)
			}			
		}
		//渲染0星个数
		if( nullStar ) {
			for( let k = 0; k < nullStar; k ++ ) {
				starjsx.push( <div key = { k + "null" } className = "star nullstar"></div>)
			}			
		}		
		return starjsx;
	}
	render() {
		return <div className = "star-score">{ this.renderScore() }</div>
	}
}

export default StarScore;