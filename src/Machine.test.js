import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import {Machine} from './components/Machine/Machine';

let container;

beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	document.body.removeChild(container);
	container = null;
});
const getMachineByID = jest.fn();
const dummy = jest.fn();
const test = {
	name:'Machine',
	ip_address:'127.0.0.1',
}
const dummyData = {
	params: {
		machineID: '123456'
	}
}

it('Renders Machine Component and checks weather the title is of current machine.', () => {
	// Test first render and componentDidMount
	act(() => {
		ReactDOM.render(<Machine getMachineByID={getMachineByID} updateMachineName={dummy} machines={test} match={dummyData}/>, container);
	});
	const label = container.querySelector('h2');
	expect(label.textContent).toBe('Machine');

	// Test second render and componentDidUpdate
});