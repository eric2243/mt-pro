import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";

import  thunk  from "redux-thunk";

import reducers from "./reducers/main.js";

const createHistory = require("history").createHashHistory;

//创建基于Hash的history
const history = createHistory();
//创建初始化Tab
history.replace("Home");
//创建history的Middleware
const historyMiddl = routerMiddleware(history);
const store = createStore( reducers, applyMiddleware( thunk, historyMiddl ) );

if( module.hot) {
	module.hot.accept( "./reducers/main", () => {
		const nextRootReducer = require( "./reducers/main.js" ).default;
		store.replaceReducer( nextRootReducer );
	});
}
module.exports = {
	store,
	history
}