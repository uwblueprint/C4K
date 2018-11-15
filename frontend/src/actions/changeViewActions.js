import * as types from './actionsTypes';

export function changeView(appView){
	return {type: types.CHANGE_VIEW, payload: appView};
}