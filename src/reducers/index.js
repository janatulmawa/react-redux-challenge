import {combineReducers} from 'redux';
import {machineReducer} from './machineReducer'

/**
 * To combine All reducers.
 */
export default combineReducers({
	machines:machineReducer
});