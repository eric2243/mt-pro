import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import tabReducer from "./tabReducer.js";
import categoryReducer from "./categoryReducer";
import contentListReducer from "./contentListReducer";
import scrollViewReducer from "../../../components/ScrollView/scrollViewReducer";
import orderReducer from "./orderReducer";

const reducers = combineReducers( {
	tabReducer,
	categoryReducer,
	contentListReducer,
	scrollViewReducer,
	orderReducer,
	router: routerReducer
});

export default reducers;