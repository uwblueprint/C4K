import React, {Component} from 'react';

// For Autocomplete
import Downshift from 'downshift'

// Material UI components
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import './SearchBar.css';

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
];

// Use SampleDownshift Bar


class SearchBar extends Component {
	render() {
		return (
			<div className="searchBar">
				<SearchIcon className="searchIcon" />
				<div className="inputBar">
					<TextField underlineShow={false} fullWidth={true} className="search" />
				</div>
			</div>
		);
	}
}

export default SearchBar;