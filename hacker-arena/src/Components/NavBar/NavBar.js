import React, {Component} from 'react';

import fire from '../../Firebase/firebase';

class NavBar extends Component {
  render() {
    let { navigate } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav ml-auto mr-auto">
          <li className="leftNav nav-item navbar-brand" onClick={ () => navigate('/') }>Home</li>
          <li className="leftNav nav-item navbar-brand" onClick={ () => navigate('/About') }>About</li>
          <li className="leftNav nav-item navbar-brand" onClick={ () => navigate('/AddProblem') }>Add Problems</li>
          {
            fire.auth().currentUser ? (
              <li
                className="nav-item rightNav navbar-brand"
                onClick={
                  () =>  fire.auth().signOut().then(() => {
                    navigate('/Login');
                  })
                }
              >
                Log out
              </li>
            ) : null
          }
        </ul>
      </nav>
    );
  }
}

export default NavBar;