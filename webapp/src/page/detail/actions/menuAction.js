import { GET_LIST_DATA, LEFT_CLICK, ADD_SELECTI_ITEM, MINUS_SELECTI_ITEM, SHOW_CHOOSE_CONTENT, CLEAR_CAR } from "./actionTypes.js";

import axios from "axios";

export const getListData = (obj) =>  (dispatch) => {
	axios({
		method: "get",
		url: "./json/food.json" 
	}).then((resp) => {
		dispatch({
			type: GET_LIST_DATA,
			obj: resp.data
		});
	});
}
export const itemClick = (obj) => {
	return {
		type: LEFT_CLICK,
		obj: obj
		}
}
export const addSelectItem = (obj) => {
	return {
		type: ADD_SELECTI_ITEM,
		obj: obj
	}
}
export const minusSelectItem = (obj) => {
	return {
		type: MINUS_SELECTI_ITEM,
		obj: obj
	}
}
export const showChoose = (obj) => {
	return {
		type: SHOW_CHOOSE_CONTENT,
		obj: obj
	}
}
export const clearCar = (obj) => {
	return {
		type: CLEAR_CAR,
		obj: obj
	}
}