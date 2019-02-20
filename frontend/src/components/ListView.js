import React, {Component} from 'react';
import { connect } from 'react-redux';

// Cards
import ListViewCard from './ListViewCard';
import './ListView.css';

class ListView extends Component {
  render() {
    return (
      <div className="listView">
      {this.props.serviceProviders
        .filter(provider => provider.ismain)
        .filter(provider => !this.props.selected || this.props.selected == provider.census_division_id)
        .map(provider => {
          return (
            <ListViewCard
              key={provider.id}
              name={provider.name}
              type={provider.type}
              location={provider.location}
              address={provider.address}
              phone={provider.phone}
              site={provider.website}
            />
          )
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    serviceProviders: state.serviceProviderReducer
  };
}

export default connect(
  mapStateToProps
)(ListView);
