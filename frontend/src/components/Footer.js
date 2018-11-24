import React, {Component} from 'react';

// Material UI components
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// Icons
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
import Subject from '@material-ui/icons/Subject';

// CSS
import './Footer.css';


class Footer extends Component {
	render() {
		return (
			<div className="footer">
				<FormGroup row className="row">
					<img 
					  src={require('../assets/memo.png')}
					  className="icon"
					/>
					<FormControlLabel
						control={
		          <Switch
		            value="checkedA"
		            color="primary"
		            className="toggle"
		          />
		        }
		        label="Notes"
		        labelPlacement="right"
	        />
				</FormGroup>
				<FormGroup row className="row">
					<BookmarkBorder className="icon" />
					<FormControlLabel
						control={
		          <Switch
		            value="checkedA"
		            color="primary"
		            className="toggle"
		          />
		        }
		        label="Bookmarked"
		        labelPlacement="left"
	        />
				</FormGroup>

			</div>
		);
	}
}

export default Footer;
