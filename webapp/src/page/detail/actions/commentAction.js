import { COMMENT_LIST_DATA } from "./actionTypes.js";

import axios from "axios";

export const getListData = (obj) => (dispatch) => {
	dispatch({
		type: "SETLOADSTATE",
		obj: false
	});
	axios({
		method: "get",
		url: "./json/comments.json"
	}).then((resp) => {
		dispatch({
			type: COMMENT_LIST_DATA,
			obj: resp.data
		});
	});


	dispatch({
		type: "SETLOADSTATE",
		obj: true
	});
}