import React, {Component} from 'react';

// Material UI components
import IconButton from '@material-ui/core/IconButton';

// Icons
import Bookmark from '@material-ui/icons/Bookmark';
import Subject from '@material-ui/icons/Subject';


// CSS
import './Footer.css';


class Footer extends Component {
	render() {
		return (
			<div className="footer">

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
