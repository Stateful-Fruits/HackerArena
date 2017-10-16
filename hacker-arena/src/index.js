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
import { Route, Switch, Redirect } from 'react-router';

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

fire.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('user is already logged in!', arguments);
    user.updateProfile(user);
    console.log('value of currentUser is now', fire.auth());
  }

  ReactDOM.render(
    <Provider store={store}>
      { /* ConnectedRouter will use the store from Provider automatically */ }
      <ConnectedRouter history={history}>
        <App>
          {
            (
              <Switch>
                <Route exact path="/" render={() => (
                  fire.auth().currentUser ? (
                    <Home />
                  ) : (
                    <Redirect to="/Login" />
                  )
                )}/>
                <Route exact path="/About" render={() => (
                  fire.auth().currentUser ? (
                    <About />
                  ) : (
                    <Redirect to="/Login" />      
                  )
                )}/>
                <Route exact path="/User" render={() => (
                  fire.auth().currentUser ? (
                    <User />
                  ) : (
                    <Redirect to="/Login" />      
                  )
                )}/>
                <Route exact path="/GameRoom/:roomId" render={() => (
                  fire.auth().currentUser ? (
                    <GameRoom />
                  ) : (
                    <Redirect to="/Login" />      
                  )
                )}/>
                <Route exact path="/Spectate/:roomId" render={() => (
                  fire.auth().currentUser ? (
                    <SpectatorRoom />
                  ) : ( 
                    <Redirect to="/Login" />      
                  )
                )}/>
                <Route exact path="/SignUp" component={SignUp}/>
                <Route exact path="/Login" component={Login}/>
              </Switch>
            )
          }
        </App>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
  

})

    

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

