import { LOAD_DEMOGRAPHICS } from './actionsTypes';

const getDemographicsByName = (census_division) => {
    return function(dispatch) {
        fetch('/division/' + census_division)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            return json.data
        })
        .then((data) => {
            dispatch({
                type: LOAD_DEMOGRAPHICS,
                demographics: data
            })
        })
    }
}

const getDemographicsById = (census_division_id) => {
    return function(dispatch) {
        fetch('/division/id/' + census_division_id)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            return json.data
        })
        .then((data) => {
            dispatch({
                type: LOAD_DEMOGRAPHICS,
                demographics: data
            })
        })
    }
}
