import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
    getServiceProviders,
} from '../actions';

// Cards
import ListViewCard from './ListViewCard';
import './ListView.css';


class ListView extends Component {
	render() {
		return (
			<div className="listView">
				{this.props.serviceProviders.map(provider => {
					return (
						<ListViewCard
							name={provider.name}
							type={''}
							location={''}
							address={provider.address}
							phone={''}
							site={provider.website}
						/>
					)
				})}
				{/* Dummy Data */}
				<ListViewCard
					name={"Lutherwood - Safe Haven"}
					type={"Lead Agency"}
					location={"Waterloo"}
					address={"41 Weber St W, Kitchener, ON N2H 4Z1"}
					phone={"(519) 749 - 1450"}
					site={"https://www.lutherwood.ca/"}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		serviceProviders: state.serviceProviderReducer
	};
}
  
function mapDispatchToProps(dispatch) {
	return {
		getServiceProviders: () => dispatch(getServiceProviders())
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListView);