import React, {Component} from 'react';

// Material UI components
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// CSS
import './Footer.css';


class Footer extends Component {
	render() {
		return (
			<div className="footer">
				<FormGroup row>
					<FormControlLabel
						control={
		          <Switch
		            value="checkedA"
		            color="primary"
		          />
		        }
		        label="Notes"
	        />
				</FormGroup>
				<FormGroup row>
					<FormControlLabel
						control={
		          <Switch
		            value="checkedA"
		            color="primary"
		          />
		        }
		        label="Bookmarked"
	        />
				</FormGroup>
			</div>
		);
	}
}

export default Footer;
