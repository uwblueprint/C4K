import React, {Component} from 'react';

// Semantic UI components
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

// CSS
import './Dropdown.css';

const styles = {
  root: {
  	paddingLeft: 8,
  },
};

class Dropdown extends Component {
	handleChange = event => {
		this.props.changeValue(event.target.value);
	}

	renderMenuItems() {
		let retval = [];

		this.props.dropdownVals.map( val => {
			retval.push(
				<MenuItem value={val}>{val}</MenuItem>
			);
		});

		return retval
	}

	render() {
		const { classes } = this.props;

		return (
			<div className="dropdown">
				<p class="title">{this.props.title}</p>
				<Select 
					className="select"
					value={ this.props.selectValue }
          onChange={ this.handleChange }
          classes={{ root: classes.root }}
				>
					<MenuItem value="">
            <em>None</em>
          </MenuItem>
          { this.renderMenuItems() }
				</Select>
			</div>
		);
	}
}

export default withStyles(styles)(Dropdown);