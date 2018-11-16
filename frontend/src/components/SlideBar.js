import React, {Component} from 'react';

// Material UI components
import Slider from '@material-ui/lab/Slider';

// CSS
import './SlideBar.css';


class SlideBar extends Component {
	render() {
		return (
			<div className="slideBar">
				<p>{this.props.title}</p>
				<Slider />
			</div>
		);
	}
}

export default SlideBar;
