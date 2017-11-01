import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './App';
import Home from './Components/Home';
import Classic from './Containers/Classic';
import GameRoom from './Containers/GameRoom';
import UserProfile from './Containers/UserProfile'
import SignUp from './Containers/SignUp'
import SpectatorRoom from './Containers/Spectator/SpectatorRoom';
import Login from './Containers/Login'
import AddProblem from './Containers/AddProblem/AddProblem';
import CreateGameRoom from './Containers/CreateGameRoom';
import CodeRunSpectator from './Containers/Spectator/CodeRunSpectator';

import CodeRunLobby from './Containers/BoardGame/Lobby';
import CodeRunRoom from './Containers/BoardGame/Game/GameRoom';

import PairHome from './Containers/Pair/PairHome'
import PairCreateGameRoom from './Containers/Pair/PairCreateGameRoom';
import Random from './Components/Random.js'
import PairGameRoom from './Containers/Pair/PairGameRoom';

import { checkIfUserIsAdminAsync, addUsernameToAuth } from './Helpers/authHelpers'

import Solo from './Containers/Solo/CreateSolo';
import SoloRoom from './Containers/Solo/SoloRoom';

import updateCurrentUser from './Actions/updateCurrentUser';

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
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

fire.auth().onAuthStateChanged(function(user) {
  console.log('onAuthStateChangedRunning');

  if (user) {
    checkIfUserIsAdminAsync(user.uid)
    .then(payload => {
      console.log('payload from check if admin', payload)
      const { adminStatus, username } = payload;
      
      user.adminStatus = adminStatus || false;
      user.username = username || fire.auth().currentUser.email.split('@')[0];

      user.updateProfile(user);
      console.log('user is now', fire.auth().currentUser);
      store.dispatch(updateCurrentUser(user));
    })
    .catch(err => {
      console.log(err);
    });
  } else {
    user = {};
    store.dispatch(updateCurrentUser(user));
  }

  let currentUser = store.currentUser;

  ReactDOM.render(
    <Provider store={store}>
      { /* ConnectedRouter will use the store from Provider automatically */ }
      <ConnectedRouter history={history}>
        <App>
          {
            (
              <Switch>
                {/* <Route exact path="/" render={() => (
                  fire.auth().currentUser ? (
                    <Home />
                  ) : (
                    <Redirect to="/" />
                  )
                )}/> */}
                <Route exact path="/AddProblem" render={() => (
                  fire.auth().currentUser ? (
                    <AddProblem />
                  ) : (
                    <Redirect to="/" />
                  )
                )}/>
                <Route exact path="/Classic" render={() => (
                  fire.auth().currentUser ? (
                    <Classic />
                  ) : (
                    <Redirect to="/" />      
                  )
                )}/>
                <Route exact path="/CreateGameRoom" render={() => (
                  fire.auth().currentUser ? (
                    <CreateGameRoom />
                  ) : (
                    <Redirect to="/" />      
                  )
                )}/>
                <Route exact path="/User/:username" render={() => (
                  fire.auth().currentUser ? (
                    <UserProfile />
                  ) : (
                    <Redirect to="/" />      
                  )
                )}/>
                <Route exact path="/GameRoom/:roomId" render={() => (
                  fire.auth().currentUser ? (
                    <GameRoom />
                  ) : (
                    <Redirect to="/" />      
                  )
                )}/>
                <Route exact path="/Spectate/:roomId" render={() => (
                  fire.auth().currentUser ? (
                    <SpectatorRoom />
                  ) : ( 
                    <Redirect to="/" />      
                  )
                )}/>
                <Route exact path="/CodeRunLobby" render={() => (
                  fire.auth().currentUser ? (
                    <CodeRunLobby />
                  ) : (
                    <Redirect to="/" />      
                  )
                )}/>
                <Route exact path="/CodeRun/:roomId" render={() => (
                  fire.auth().currentUser ? (
                    <CodeRunRoom />
                  ) : (
                    <Redirect to="/" />      
                  )
                )}/>

                <Route exact path="/Pair" render={() => (
                  fire.auth().currentUser ? (
                    <PairHome />
                  ) : (
                    <Redirect to="/" />      
                  )
                )}/>

                <Route exact path="/Pair/CreateGameRoom" render={() => (
                  fire.auth().currentUser ? (
                    <PairCreateGameRoom />
                  ) : (
                    <Redirect to="/" />      
                  )
                )}/>

                <Route exact path="/Pair/GameRoom/:roomId" render={() => (
                  fire.auth().currentUser ? (
                    <PairGameRoom />
                    ) : (
                    <Redirect to="/" />      
                    )
                  )}/>

                <Route exact path="/Solo" render={() => (
                  fire.auth().currentUser ? (
                    <Solo />
                  ) : (
                    <Redirect to="/" />      
                  )
                )}/>

                <Route exact path="/Solo/GameRoom/:roomId" render={() => (
                  fire.auth().currentUser ? (
                    <SoloRoom />
                    ) : (
                    <Redirect to="/" />      
                    )
                  )}/>
                <Route exact path="/CodeRunSpectator/:roomId" render={() => (
                  fire.auth().currentUser ? (
                    <CodeRunSpectator />
                    ) : (
                    <Redirect to="/" />      
                    )
                  )}/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/SignUp" component={SignUp}/>
                <Route exact path="/Solo" component={Solo}/>
                <Route exact path="/Classic" component={Classic}/>
                <Route exact path="/Random" component={Random}/>
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

