import React, {Component} from 'react';

// Semantic UI components
import Drawer from '@material-ui/core/Drawer';

import { withStyles } from '@material-ui/core/styles';

// Filter Components
import SearchBar from './SearchBar';
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
let dropDownVals = {
  Waterloo: 'Waterloo',
  Aboriginal: 'Aboriginal',
  Ottawa: 'Ottawa'
}

class Sidebar extends Component {

  render() {
    const { classes } = this.props;

    const namesMap = {} // cd_name -> cd_id
    for (let key in this.props.censusDivisionData) {
      let value = this.props.censusDivisionData[key]
      namesMap[value.name] = value.id
    }

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
          }} >
          <SearchBar />
          <div className="body">
            <Dropdown
              title={"Census Division"}
              selectValue={this.props.selected || ''}
              changeValue={this.props.selectCensusDivision}
              dropdownVals={ namesMap } />
            <Dropdown
              title={"Demographic"}
              selectValue={this.props.demographic}
              changeValue={this.props.changeDemographic}
              dropdownVals={dropDownVals} />
            <FilterSelect />
            <SlideBar
              title={"Operating Budget"}
              val={this.props.operatingBudget}
              changeVal={this.props.changeOperatingBudget} />
            <SlideBar
              title={"Client Served"}
              val={this.props.clientServed}
              changeVal={this.props.changeClientServed} />
            <SlideBar
              title={"Staff Count"}
              val={this.props.staffCount}
              changeVal={this.props.changeStaffCount} />
          </div>
          <Footer />
        </Drawer>
      </div>
    );
  }
}

// Need to use withStyles
export default withStyles(styles)(Sidebar);
