import React, {Component} from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';

// Login Dialog
import LoginDialog from './LoginDialog'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import InputAdornment from '@material-ui/core/InputAdornment';

// Icons
import SearchIcon from '@material-ui/icons/Search';

// CSS
import './SearchBar.css'

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
];

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment 
            position="start"
            className={classes.searchIcon}
          >
            <SearchIcon />
          </InputAdornment>
        ),
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

// User is repsonsible for rendering - downshift knows that state
function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
    height: 49,
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  searchIcon: {
    marginLeft: 10,
  },
});


class sampleSearchBar extends Component {

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" className="header">
        <div className="topBar">
          <img
            src={require('../assets/C4K_abbrv_gold_WHITE.png')}
            className="logo"
          />
          <div className="loginButton">
            <LoginDialog />
          </div>
        </div>
        <div className={classes.root} id="searchBar">
          <div className="inputBar">
            <Downshift id="downshift-simple">
              {({
                getInputProps,
                getItemProps,
                getMenuProps,
                highlightedIndex,
                inputValue,
                isOpen,
                selectedItem,
              }) => (
                <div className={classes.container}>
                  {renderInput({
                    fullWidth: true,
                    classes,
                    InputProps: getInputProps({
                      placeholder: 'Search',
                    }),
                  })}
                  <div {...getMenuProps()}>
                    {isOpen ? (
                      <Paper className={classes.paper} square>
                        {getSuggestions(inputValue).map((suggestion, index) =>
                          renderSuggestion({
                            suggestion,
                            index,
                            itemProps: getItemProps({ item: suggestion.label }),
                            highlightedIndex,
                            selectedItem,
                          }),
                        )}
                      </Paper>
                    ) : null}
                  </div>
                </div>
              )}
            </Downshift>
          </div>
        </div>
      </AppBar>
    );
  }
}

sampleSearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(sampleSearchBar);