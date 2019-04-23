
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './components/App';


//console.log('TEST');
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext === undefined ? state => state : ext();


const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        devtoolMiddleware,
    ),
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('users-diagram')
);
