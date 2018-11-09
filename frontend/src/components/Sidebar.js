import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import './Sidebar.css';


class Sidebar extends Component {
	render() {
		return (
			<div>
				<Drawer open="true" variant="permanent">
					<ToggleButtonGroup>
						<ToggleButton value="left" selected>
							MapView
						</ToggleButton>
						<ToggleButton value="right" selected>
							ListView
						</ToggleButton>
					</ToggleButtonGroup>
					<h1 class="title">Here is the Nav Bar</h1>
				</Drawer>
			</div>
		);
	}
}

export default Sidebar;