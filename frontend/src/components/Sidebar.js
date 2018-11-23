import React, {Component} from 'react';

// Semantic UI components
import Drawer from '@material-ui/core/Drawer';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { withStyles } from '@material-ui/core/styles';

// Filter Components
import SearchBar from './SearchBar';
import FilterSelect from './FilterSelect';
import Dropdown from './Dropdown';
import SlideBar from './SlideBar';
import Footer from './Footer';

// CSS
import './Sidebar.css';

const styles = {
  root: {
  },
  paper: {
	// Add styles to the Drawer Directly
    width: 400,
  },
};

class Sidebar extends Component {
	render() {
		console.log(this.props);
		const { classes } = this.props;

		return (
			<div className="sidebar">
				<Drawer
					open={true}
					variant="permanent"
					containerClassName={"sideBar"}
					className="sidebar"
					classes={{
		        root: classes.root, // class name, e.g. `classes-nesting-root-x`
		        paper: classes.paper, // class name, e.g. `classes-nesting-label-x`
		      }}
				>
					<SearchBar />
					<FilterSelect />
					<Dropdown />
					<Footer />
				</Drawer>
			</div>
		);
	}
}

// Need to use withStyles
export default withStyles(styles)(Sidebar);