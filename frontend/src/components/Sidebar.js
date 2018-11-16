import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import SearchBar from './SearchBar';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import './Sidebar.css';


class Sidebar extends Component {
	render() {
		return (
			<div>
				<Drawer open={true} variant="permanent">
					<SearchBar />
					<h1 className="title">Here is the Nav Bar</h1>
				</Drawer>
			</div>
		);
	}
}

export default Sidebar;