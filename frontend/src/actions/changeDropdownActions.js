import * as types from './actionsTypes';

export function changeCensusDivision(value) {
	return {type: types.CHANGE_CENSUS_DIVISION, payload: value}
}

export function changeDemographic(value) {
	return {type: types.CHANGE_DEMOGRAPHIC, payload: value}
}