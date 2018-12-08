import * as types from './actionsTypes';

export function selectCensusDivision(censusDivisionId){
	return {type: types.SELECT_CENSUS_DIVISION, payload: censusDivisionId};
}