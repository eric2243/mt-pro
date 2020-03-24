import { createStore, applyMiddleware } from "redux";

import  thunk  from "redux-thunk";
import logger from "redux-logger";

import reducers from "./reducers/main.js";

const store = createStore( reducers, applyMiddleware( thunk, logger ) );

if( module.hot) {
	module.hot.accept( "./reducers/main", () => {
		const nextRootReducer = require( "./reducers/main.js" ).default;
		store.replaceReducer( nextRootReducer );
	});
}

export default store;