import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchMachines, setHealth} from '../actions/machineActions';
import './machines.module.css';
import {Link, BrowserRouter as Router, withRouter} from 'react-router-dom';
import Health from './Health/Health';

const ws = new WebSocket('ws://localhost:1337');

/**
 * The export here is added so that we can test it using JEST without having to account for redux store.
 */
export class Machines extends Component {
	componentDidMount () {
		this.props.fetchMachines();
		ws.onmessage = (event) => {
			let {id, type, health} = JSON.parse(event.data);
			type === 'HEALTH_UPDATE' && this.props.setHealth(id, health);
		};
	}

	navigateToMachine (id) {
		this.props.history.push('/machines/' + id);
	}

	renderMachines () {
		return Object.keys(this.props.machines).map((key, index) => {
			const {id, name, ip_address, health} = this.props.machines[key]; // destructuring
			return (
				<tr onClick={() => {
					this.navigateToMachine(id);
				}} key={id}>
					<td>{name}</td>
					<td>{ip_address}</td>
					<td><Health value={health}/></td>
				</tr>
			);
		});
	}

	render () {
		return (
			<div>
				<h3>Machines</h3>
				<table id='machines'>
					<thead>
						<tr>
							<th>Machine Name</th>
							<th>IP Address</th>
							<th>Health</th>
						</tr>
					</thead>
					<tbody>
						{this.renderMachines()}
					</tbody>
				</table>
			</div>
		);
	}
}

Machines.propTypes = {
	fetchMachines: PropTypes.func.isRequired,
	setHealth: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	machines: state.machines.items
});
export default withRouter(connect(
	mapStateToProps,
	{
		fetchMachines,
		setHealth
	}
)(Machines));
