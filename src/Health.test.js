import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Health from './components/Health/Health';

let container;

beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	document.body.removeChild(container);
	container = null;
});

it('can render and update a counter', () => {
	// Test first render and componentDidMount
	act(() => {
		ReactDOM.render(<Health />, container);
	});

});