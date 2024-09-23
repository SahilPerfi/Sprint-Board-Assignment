import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import SprintBoard from './components/SprintBoard';

ReactDOM.render(
    <Provider store={store}>
        <SprintBoard />
    </Provider>,
    document.getElementById('root')
);
