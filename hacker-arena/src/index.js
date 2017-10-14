import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './App';
import About from './Components/About';
import Home from './Containers/Home';
import GameRoom from './Containers/GameRoom';
import User from './Containers/User'
import SignUp from './Containers/SignUp'
import SpectatorRoom from './Containers/Spectator/SpectatorRoom';
import Login from './Containers/Login'

// To check Log in info
import fire from './Firebase/firebase';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route, Switch } from 'react-router';

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import reducers from './Reducers/index';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
console.log('reducers', reducers);
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
        {
          fire.auth().currentUser ? (
            <Switch>
              <Route exact path="/" component={ Home }/>
              <Route exact path="/About" component={About}/>
              <Route exact path="/User" component={User}/>
              <Route exact path="/GameRoom/:roomId" component={GameRoom}/>
              <Route exact path="/Spectate/:roomId" component={SpectatorRoom}/>
              <Route exact path="/SignUp" component={SignUp}/>
              <Route exact path="/Login" component={Login}/>
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/SignUp" component={SignUp}/>
              <Route exact path="/*" component={Login}/>
            </Switch>
          )
        }
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
