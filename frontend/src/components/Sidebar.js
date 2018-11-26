import React, {Component} from 'react';

// Semantic UI components
import Drawer from '@material-ui/core/Drawer';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import LoginDialog from './LoginDialog'

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
    width: 441,
  },
};

// Should be replaced with data passed from backend
let dropDownVals = ["Waterloo", "Aboriginal", "Ottawa"]

class Sidebar extends Component {

	render() {
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
					<div className="body">
						<Dropdown 
							title={"Census Division"}
							selectValue={this.props.censusDivision}
							changeValue={this.props.changeCensusDivision}
							dropdownVals={dropDownVals}
						/>
						<Dropdown 
							title={"Demographic"}
							selectValue={this.props.demographic}
							changeValue={this.props.changeDemographic}
							dropdownVals={dropDownVals}
						/>
						<FilterSelect />
						<SlideBar
							title={"Operating Budget"}
							val={this.props.operatingBudget}
							changeVal={this.props.changeOperatingBudget}
						/>
						<SlideBar
							title={"Client Served"}
							val={this.props.clientServed}
							changeVal={this.props.changeClientServed}
						/>
						<SlideBar
							title={"Staff Count"}
							val={this.props.staffCount}
							changeVal={this.props.changeStaffCount}
						/>
					</div>
					<Footer />
					<LoginDialog />
				</Drawer>
			</div>
		);
	}
}

// Need to use withStyles
export default withStyles(styles)(Sidebar);