import React, {Component} from 'react';

// Semantic UI components
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

// CSS
import './Dropdown.css';

const styles = {
  root: {
    paddingLeft: 8,
  },
};

class Dropdown extends Component {
  handleChange = event => {
    this.props.changeValue(event.target.value);
  }

  renderMenuItems() {
    const sortedNames = Object.keys(this.props.dropdownVals)
    sortedNames.sort()

    return sortedNames.map((name) => {
      const val = this.props.dropdownVals[name]
      return <MenuItem value={ val }>{ name }</MenuItem>
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="dropdown">
        <p className="title">{this.props.title}</p>
        <Select 
            className="select"
            value={ this.props.selectValue }
            onChange={ this.handleChange }
            classes={{ root: classes.root }}
            displayEmpty >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          { this.renderMenuItems() }
        </Select>
      </div>
    );
  }
}

export default withStyles(styles)(Dropdown);
