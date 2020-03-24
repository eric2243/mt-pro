import { CHANGE_TAB, ADD_TODO } from "./actionTypes.js";

export const changeTab = ( obj ) => {
	return {
		type: CHANGE_TAB,
		obj: obj
	}
}
export const addTodo = (obj) => {
	return {
		type: ADD_TODO,
		obj: obj
	}
}