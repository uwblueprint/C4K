import React, {Component} from 'react';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import './ToggleView.css';

class ToggleView extends Component {
	render() {

		return (
			<div>
				<ToggleButtonGroup>
					<ToggleButton value="left" selected>
						MapView
					</ToggleButton>
					<ToggleButton value="right" selected>
						ListView
					</ToggleButton>
				</ToggleButtonGroup>
			</div>
		);
	}
}

export default ToggleView;