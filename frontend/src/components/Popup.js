import React, {Component} from 'react';

// Material UI Icons
import Place from '@material-ui/icons/Place';
import Public from '@material-ui/icons/Public';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';

import './Popup.css';

class Popup extends Component {
	render() {
		return (
			<div className="Popup">
				<div className="content">
					<span className="name">{ this.props.name }</span>
					<span className="type">{ this.props.type }</span>
					<span className="noteBookmark">
						<img
						  src="../assets/memo.png"
						  alt="Notes"
						  className="icon"
						/>
						<BookmarkBorder className="icon" />
					</span>
					<p className="location">{ this.props.location }</p>
					<div className="subContent">
						<Place className="icon" />
						<span className="address">{ this.props.address }</span>
					</div>
					<div className="subContent">
						<Public className="icon" />
						<span className="site">{ this.props.site }</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Popup;
