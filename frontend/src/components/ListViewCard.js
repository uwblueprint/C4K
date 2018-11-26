import React, {Component} from 'react';

// Material UI
import Place from '@material-ui/icons/Place'
import Phone from '@material-ui/icons/Phone'
import Public from '@material-ui/icons/Public'

// CSS
import './ListViewCard.css';


class ListViewCard extends Component {

	render() {
		return (
			<div className="listViewCard">
				<div className="container">
					<span className="title">{this.props.title}</span>
					<span className="subTitle">{this.props.subTitle}</span>
					<p>{this.props.location}</p>
					<div>
						<Place />
						<span className="textDecoration">{this.props.address}</span>
					</div>

					<div>
						<Phone />
						<span className="textDecoration">{this.props.phone}</span>
					</div>

					<div>
						<Public />
						<span className="textDecoration">{this.props.site}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default ListViewCard;
