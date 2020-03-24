import thunk from "redux-thunk";

import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";

import Reducers from "./reducers/main.js";

const createHashHistory = require("history").createHashHistory;

// 创建基于Hash的history
const history = createHashHistory();

// 创建初始化Tab
history.replace("menu");

// 创建history的Middleware
const historyMiddl = routerMiddleware(history);


const store = createStore(Reducers, applyMiddleware(thunk, historyMiddl));

if (module.hot) {
    module.hot.accept('./reducers/main', ()=>{
        const nextRootReducer = require('./reducers/main.js').default;
        store.replaceReducer(nextRootReducer)
    });
}
module.exports = {
	store,
	history
}