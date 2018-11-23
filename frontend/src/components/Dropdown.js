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
				<h1>Demographic</h1>
				<Select className="select">
					<MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Body 1</MenuItem>
          <MenuItem value={20}>Body 2</MenuItem>
          <MenuItem value={30}>Body 3</MenuItem>
				</Select>
			</div>
		);
	}
}

export default Dropdown;