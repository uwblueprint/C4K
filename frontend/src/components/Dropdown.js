import React, {Component} from 'react';

// Semantic UI components
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// CSS
import './Dropdown.css';


class Dropdown extends Component {
	render() {
		return (
			<div className="dropdown">
				<Select className="select">
					<MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
				</Select>
			</div>
		);
	}
}

export default Dropdown;