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
        .map(provider => {
          return (
            <ListViewCard
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
    serviceProviders: state.dataReducer.serviceProviders
  };
}

export default connect(
  mapStateToProps
)(ListView);
