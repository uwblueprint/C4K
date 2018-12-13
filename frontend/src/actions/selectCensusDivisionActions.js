import * as types from './actionsTypes';

export function changeSelectedCensusDivision(censusDivisionId){
	return {type: types.SELECT_CENSUS_DIVISION, payload: censusDivisionId};
}