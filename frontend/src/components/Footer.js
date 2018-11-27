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
				<div className="footerContent">
					<div className="row">
						<span className="label">
							<img 
							  src="../assets/memo.png"
							  alt="Notes"
							  className="icon"
							/>
							Notes
						</span>

						<div className="toggle">
	          	<Switch
		            value="checkedA"
		            color="primary"
		          />
	          </div>
	        </div>
					<div className="row">
						<span className="label">
							<BookmarkBorder
								className="icon"
							/>
							Bookmarked
						</span>

						<div className="toggle">
		          <Switch
		            value="checkedA"
		            color="primary"
			        />
			      </div>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;
