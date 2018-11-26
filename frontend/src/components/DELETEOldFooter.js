import React, {Component} from 'react';

// Material UI components
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
				<FormGroup row>
					<FormControlLabel
						control={
		          <Switch
		            value="checkedA"
		            color="primary"
		          />
		        }
		        label="Notes"
		        labelPlacement="left"
	        />
	        <Subject className="icon" />
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
		        labelPlacement="left"
	        />
	        <BookmarkBorder className="icon" />
				</FormGroup>

				<IconButton aria-label="Notes" className="iconButton">
				  <Subject fontSize="large" />
				</IconButton>

				<IconButton aria-label="Bookmark" className="iconButton">
				  <Bookmark fontSize="large" />
				</IconButton>
			</div>
		);
	}
}

export default Footer;
