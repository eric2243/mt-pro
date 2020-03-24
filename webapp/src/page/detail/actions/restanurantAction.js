import { RESTANURANT_DATA } from "./actionTypes.js";

import axios from "axios";

export const getRestanurantData = (obj) => (dispatch) => {
	axios({
		method: "get",
		url: "./json/restanurant.json" 
	}).then((resp) => {
		dispatch({
			type: RESTANURANT_DATA,
			obj: resp.data
		})
	});
}