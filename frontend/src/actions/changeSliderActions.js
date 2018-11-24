import * as types from './actionsTypes';

export function changeOperatingBudget(value) {
	return {type: types.CHANGE_OPERATING_BUDGET, payload: value}
}

export function changeClientServed(value) {
	return {type: types.CHANGE_CLIENT_SERVED, payload: value}
}

export function changeStaffCount(value) {
	return {type: types.CHANGE_STAFF_COUNT, payload: value}
}