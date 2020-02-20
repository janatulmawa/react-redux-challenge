import {FETCH_MACHINES, SET_MACHINE_NAME, SET_HEALTH,GET_MACHINE_BY_ID} from './types';
import axios from 'axios';

/**
 * Fetch Machines action creator. Dispatches an action to get all machines and set in store.
 * @returns {function(...[*]=)}
 */
export const fetchMachines = () => dispatch => {
	axios.get('http://localhost:8080/machines')
		.then(res => {
			let x = [];
			res.data.forEach(d=>{
				x[d.id] = d;
			});
			dispatch({
				type: FETCH_MACHINES,
				payload: x
			});
		})
		.catch(err=>console.log(err));
};

/**
 * Updates the name of a single machine.
 * @param name
 * @param id
 * @returns {function(...[*]=)}
 */
export const updateMachineName = (name, id) => dispatch => {
	console.log('called')
	axios.put('http://localhost:8080/machines/'+id, {name})
		.then(res=>{
			let x = [];
			x[id] = {name};
			console.log(x);
			dispatch({
				type: SET_MACHINE_NAME,
				payload:x
			});
		})
		.catch(err=>console.log(err));
};

/**
 * Set health of machines that come from websocket.
 * @param id
 * @param health
 * @returns {function(...[*]=)}
 */

export const setHealth = (id, health) => dispatch => {
	let x = [];
	x[id] = {health};
	dispatch({
		type: SET_HEALTH,
		payload: x
	});
};

/**
 * Get a single machine by ID.
 * @param id
 * @returns {machine}
 */
export const getMachineByID = (id) => dispatch => {
	axios.get('http://localhost:8080/machines/'+id)
		.then(res => {
			dispatch({
				type:GET_MACHINE_BY_ID,
				payload: res.data
			})
		})
		.catch(err=>console.log(err));
};
