import React, { Component } from "react";
import { getHeaderData } from "../../actions/categoryAction";
import { connect } from "react-redux";
import "./Category.scss";

class Category extends Component {
	constructor( props) {
		super( props );
		this.fetchData();
	}

	fetchData() {
		this.props.dispatch( getHeaderData() );
	}

    goCategory(){
        window.location.href = './category.html';
    }
	renderItems() {
		let items = this.props.items;
        // 复制数组防止引用
        let _items = JSON.parse(JSON.stringify(items));
		return _items.splice( 0, 8 ).map( ( item, index ) => {
			return (
				<div key = { index } className = "category-item" onClick={this.goCategory}>
					<img className = "item-icon" src = { item.url } alt=""/>
					<p className = "item-name">{ item.name }</p>
				</div>
				)
		} );
	}
	render() {
		return (
			<div className = "category-content clearfix">{ this.renderItems() }</div>
			)
	}
}

export default connect(
		state => ( {
			items: state.categoryReducer.items
		} )
	)( Category );