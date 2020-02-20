import React from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils';
import {Machines} from './components/Machines';

let container;

beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	document.body.removeChild(container);
	container = null;
});
const testFetch = jest.fn();
const dummy = jest.fn();
const test =
	[
		{
			id:'21341',
			name: 'Machine 1',
			ip_address: '127.0.0.1'
		},
		{
			id:'12345',
			name: 'Machine 2',
			ip_address: '127.0.0.1'
		},

	];

const dummyData = {
	params: {
		machineID: '123456'
	}
};

it('Renders Machines Component and Checks whether Machine name, ip and health are there.', () => {
	// Test first render and componentDidMount
	act(() => {
		ReactDOM.render(<Machines fetchMachines={testFetch} setHealth={dummy} machines={test}/>, container);
	});
	const label = container.querySelector('tr');
	expect(label.textContent).toBe("Machine NameIP AddressHealth");

	// Test second render and componentDidUpdate
});