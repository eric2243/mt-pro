import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import tabReducer from "./tabReducer";
import menuReducer from "./menuReducer";
import commentReducer from "./commentReducer";
import scrollViewReducer from "component/ScrollView/scrollViewReducer";
import restanurantReducer from "./restanurantReducer";

const reducers = combineReducers( {
	tabReducer,
	menuReducer,
	commentReducer,
	scrollViewReducer,
	restanurantReducer,
	router: routerReducer
});

export default reducers;