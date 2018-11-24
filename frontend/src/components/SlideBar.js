import React, {Component} from 'react';

// Material UI components
import Slider from '@material-ui/lab/Slider';

// CSS
import './SlideBar.css';


class SlideBar extends Component {
	handleChange = (event, value) => {
		this.props.changeVal(value);
	};

	render() {
		return (
			<div className="slideBar">
				<p className="title">{this.props.title}</p>
				<Slider
					value={this.props.val}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}

export default SlideBar;
