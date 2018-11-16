import React, {Component} from 'react';
import Checkbox from '@material-ui/core/Checkbox';

// CSS
import './FilterSelect.css'

class FilterSelect extends Component {
	render() {
		return (
			<div>
				<div className="filterGroup" id="topSelect" >
					<span className="text">Lead Agency</span>
					<div className="checkbox">
						<Checkbox color="primary"/>
					</div>
				</div>
				<div className="filterGroup">
					<span className="text">Targeted Prevention</span>
					<Checkbox className="checkbox" color="primary"/>
				</div>
				<div className="filterGroup">
					<span className="text">Walk In Clinic</span>
					<Checkbox className="checkbox" color="primary"/>
				</div>
				<div className="filterGroup">
					<span className="text">Counselling Therapy</span>
					<Checkbox className="checkbox" color="primary"/>
				</div>
				<div className="filterGroup">
					<span className="text">Family Assistance</span>
					<Checkbox className="checkbox" color="primary"/>
				</div>
				<div className="filterGroup">
					<span className="text">Specialized Consultant</span>
					<Checkbox className="checkbox" color="primary"/>
				</div>
				<div className="filterGroup">
					<span className="text">Crisis Support</span>
					<Checkbox className="checkbox" color="primary"/>
				</div>
			</div>
		);
	}
}

export default FilterSelect;