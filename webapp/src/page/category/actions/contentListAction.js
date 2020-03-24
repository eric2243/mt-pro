import { GET_LIST_DATA } from "./actionTypes.js";

import axios from "axios";

export const getListData = (obj) => (dispatch, getState) => {
	dispatch({
		type: "SETLOADSTATE",
		obj: false
	});
	let url = "./json/homelist.json";

	if(obj.filterData || getState().contentListReducer.filterData) {
		url = "./json/listparams.json";
	}
	axios({
		method: "get",
		url: url 
	}).then((resp) => {
		dispatch({
			type: GET_LIST_DATA,
			filterData: obj.filterData,
			toFirstPage: obj.toFirstPage,
			obj: resp.data
		})
	});
	dispatch({
		type: "SETLOADSTATE",
		obj: true
	});
}