import { GET_LIST_DATA, LEFT_CLICK, ADD_SELECTI_ITEM, MINUS_SELECTI_ITEM, SHOW_CHOOSE_CONTENT, CLEAR_CAR } from "../actions/actionTypes";

const initState = {
	listData: {food_spu_tags:[]},
	currentLeftIndex: 0,
	showChooseContent: false,
	poiInfo: {}
};

const getListData = (state, action) => {
	if(state.listData.food_spu_tags.length > 0) {
		return {...state};
	}
	return {...state, poiInfo: action.obj.data, listData: action.obj.data || {food_spu_tags:[]}};
}
const itemClick = (state, action) => {
	return {...state, currentLeftIndex: action.obj.currentLeftIndex};
}
const addSelectItem = (state, action) => {
	return {...state, listData: dealWithSelectItem(state, action, ADD_SELECTI_ITEM)};
}
const minusSelectItem = (state, action) => {
	return {...state, listData: dealWithSelectItem(state, action, MINUS_SELECTI_ITEM)};
}
const dealWithSelectItem = (state, action, type) => {
	let listData = state.listData;
	//找到外层左侧list列表
	let list = listData.food_spu_tags || [];
	//通过列表找到左侧item使用的数据也就是点击的item数据
	let currentItem = list[action.outIndex || state.currentLeftIndex];
	//对当前点击的这个item的chooseCount加一或减一
	if(type === ADD_SELECTI_ITEM) {
		currentItem.spus[action.obj.index].chooseCount ++;
	}else {
		currentItem.spus[action.obj.index].chooseCount --;
	}
	let _listData = JSON.parse(JSON.stringify(listData));
	return _listData;
}
const chooseContent = (state, action) => {
	return {...state, showChooseContent: action.obj.flag};
}
const clearCar = (state) => {
	let listData = state.listData;
	//找到外层，左边list列表
	let list = listData.food_spu_tags || [];

	for(let i = 0; i < list.length; i ++) {
		let spus = list[i].spus || [];

		for(let j = 0; j < spus.length; j ++) {
			spus[j].chooseCount = 0;
		}
	}
	return {...state, listData: JSON.parse(JSON.stringify(listData))};
}
const menuReducer = (state = initState, action) => {
	switch(action.type) {
		case GET_LIST_DATA: 
			return getListData(state, action);
		case LEFT_CLICK:
			return itemClick(state, action);
		case ADD_SELECTI_ITEM:
			return addSelectItem(state, action);
		case MINUS_SELECTI_ITEM:
			return minusSelectItem(state, action);
		case SHOW_CHOOSE_CONTENT:
			return chooseContent(state, action);
		case CLEAR_CAR:
			return clearCar(state, action);
		default:
			return state;
	}
};

export default menuReducer;