import React, {Component} from 'react';

// Cards
import ListViewCard from './ListViewCard';
import './ListView.css';

class ListView extends Component {
	render() {
		return (
			<div className="listView">
				<ListViewCard
					title={"Lutherwood - Safe Haven"}
					subTitle={"Lead Agency"}
					location={"Waterloo"}
					address={"41 Weber St W, Kitchener, ON N2H 4Z1"}
					phone={"(519) 749 - 1450"}
					site={"https://www.lutherwood.ca/"}
				/>
				<ListViewCard
					title={"Lutherwood - Safe Haven"}
					subTitle={"Lead Agency"}
					location={"Waterloo"}
					address={"41 Weber St W, Kitchener, ON N2H 4Z1"}
					phone={"(519) 749 - 1450"}
					site={"https://www.lutherwood.ca/"}
				/>
				<ListViewCard
					title={"Lutherwood - Safe Haven"}
					subTitle={"Lead Agency"}
					location={"Waterloo"}
					address={"41 Weber St W, Kitchener, ON N2H 4Z1"}
					phone={"(519) 749 - 1450"}
					site={"https://www.lutherwood.ca/"}
				/>
			</div>
		);
	}
}

export default ListView;