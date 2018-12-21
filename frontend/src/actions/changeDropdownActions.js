import * as types from './actionsTypes';

export const changeDemographic = (value) => {
	return {type: types.CHANGE_DEMOGRAPHIC, payload: value}
}
