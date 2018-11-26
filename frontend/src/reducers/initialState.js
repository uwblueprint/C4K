import * as constants from '../constants/viewConstants';

export default {
  view: constants.MAP_VIEW
};

export let initialDropDownState = {
	censusDivision: "Waterloo",
	demographic: "Aboriginal"
}

// Values should be on a scale of 0-100 rn
export let initialSliderVals = {
	operatingBudget: 50,
	clientServed: 50,
	staffCount: 50,
}