import * as types from './actionsTypes';

export const changeCensusDivision = (value) => {
	return {type: types.CHANGE_CENSUS_DIVISION, payload: value}
}

export const changeDemographic = (value) => {
	return {type: types.CHANGE_DEMOGRAPHIC, payload: value}
}