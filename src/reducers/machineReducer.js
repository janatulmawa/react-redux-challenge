import {FETCH_MACHINES, GET_MACHINE_BY_ID, NEW_MACHINE, SET_HEALTH, SET_MACHINE_NAME} from '../actions/types';

/**
 * Initial State for store.
 * @type {{item: {}, items: []}}
 */
const initialState = {
	items: [],
	item: {}
};

/**
 * Reducer for machine actions.
 * @param state
 * @param action
 *
 */
export const machineReducer = (state = initialState, action) => {
	switch (action.type) {
		/**
		 * Get all machines from the server.
		 */
		case FETCH_MACHINES:
			return {
				...state,
				items: action.payload
			};
		/**
		 * Set the health of each machine that is being emitted from the web socket.
		 */
		case SET_HEALTH: {
			let key = Object.keys(action.payload)[0];
			if (state.items.hasOwnProperty(key)) {
				let d = {...state.items};
				d[key] = {
					id: state.items[key].id,
					name: state.items[key].name,
					health: action.payload[key].health,
					ip_address: state.items[key].ip_address
				};
				return {
					...state,
					items: d
				};
			}
			break;
		}
		/**
		 * Update machine name
		 */
		case SET_MACHINE_NAME: {
			let key = Object.keys(action.payload)[0];
			let d = {...state.item};
			d[key] = {
				id: state.item.id,
				name: action.payload[key].name,
				health: state.item.health,
				ip_address: state.item.ip_address
			};
			return {
				...state,
				item: d[key]
			};
			break;
		}
		/**
		 * Get a specific machine.
		 */
		case GET_MACHINE_BY_ID: {
			return ({
				...state,
				item: action.payload
			});


		}
		default:
			return state;
	}
};
