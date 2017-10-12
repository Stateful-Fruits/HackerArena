import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './App';
import About from './Components/About';
import Home from './Containers/Home'
import User from './Containers/User'


import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

import reducers from './Reducers'; // Or wherever you keep your reducers

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <App>
        <Route exact path="/" component={Home}/>
        <Route exact path="/About" component={About}/>
        <Route exact path="/User" component={User}/>
        
        {/* <Route exact path="/GameRoom" component={GameRoom}/> */}
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
