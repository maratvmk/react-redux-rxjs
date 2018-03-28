import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

import App from './components/App';
import Foo from './components/Foo';
import Bar from './components/Bar';
import { userReducer, fetchUserEpic } from './redux/user';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


const rootEpic = combineEpics(
    fetchUserEpic
);

const rootReducer = combineReducers({
    userReducer,
    routing: routerReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(
        routerMiddleware(browserHistory),
        createEpicMiddleware(rootEpic),
    )
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="foo" component={Foo}/>
                <Route path="bar" component={Bar}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker();