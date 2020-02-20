import React, {useState, useEffect} from 'react';
import styles from './machine.module.css';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Health from '../Health/Health';
import {updateMachineName,getMachineByID} from '../../actions/machineActions';

const ws = new WebSocket('ws://localhost:1337');

/**
 * Individual machine component
 */
export class Machine extends React.Component {
	state = {
		name: '',
		ip_address: '',
		health: 0,
		id: '',
		isMounted: false
	};

	submitData = () => {
		console.log(this.state.name);
		this.props.updateMachineName(this.state.name, this.props.match.params.machineID);
	};

	componentDidMount () {
		this.props.getMachineByID(this.props.match.params.machineID);
		this.setState({isMounted: true});
		ws.onmessage = (event) => {
			let {id, type, health} = JSON.parse(event.data);
			type === 'HEALTH_UPDATE' && id === this.props.match.params.machineID && this.state.isMounted && this.setState({health});
		};
	}

	componentWillUnmount () {
		this.setState({isMounted:false});
	}

	render () {
		return (
			<div className={styles.gridContainer}>
				<div className={styles.gridItem}>
					<div>
						<h2>{this.props.machines.name}</h2>
						<h3>Update Device</h3>
						<div className={styles.inputForm}>
							<p>Name:</p>
							<input className={styles.textField} onChange={(e)=>{this.setState({name:e.target.value})}} type="text" id="machine" name="machine"
								   placeholder="Machine Name"/>
							<input onClick={this.submitData} type="button" value="Change Name"/>
						</div>
					</div>
				</div>
				<div className={styles.gridItem}>
					<div className={styles.healthWrapper}>
						<Health value={this.state.health} showNumber={true}/>
					</div>
					<h4>Stats</h4>
					<p>IP Address: {this.props.machines.ip_address}</p>
				</div>
			</div>
		);
	}
}

Machine.propTypes = {
	updateMachineName: PropTypes.func.isRequired,
	getMachineByID:PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	machines: state.machines.item
});

export default connect(mapStateToProps, {updateMachineName, getMachineByID})(Machine);
