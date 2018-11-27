import React, {Component} from 'react';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import './ToggleView.css';
import * as constants from '../constants/viewConstants';

class ToggleView extends Component {
	render() {
		return (
			<div className="toggleGroup">
				<ToggleButtonGroup>
					<ToggleButton
						onClick={ () => {
								this.props.changeView(constants.MAP_VIEW);
							}
						}
						value="left"
						className={this.props.view === constants.MAP_VIEW ?
						           "selectedToggle" : ""}
					>
						MapView
					</ToggleButton>
					<ToggleButton
						onClick={ () => {
								this.props.changeView(constants.LIST_VIEW);
							}
						}
						value="right"
						className={this.props.view === constants.LIST_VIEW ?
						           "selectedToggle" : ""}
					>
						ListView
					</ToggleButton>
				</ToggleButtonGroup>
			</div>
		);
	}
}

export default ToggleView;