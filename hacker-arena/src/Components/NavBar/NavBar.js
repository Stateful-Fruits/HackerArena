import React, {Component} from 'react';

import fire from '../../Firebase/firebase';

class NavBar extends Component {
  render() {
    let { navigate } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav ml-auto mr-auto">
          <li className="nav-item rightNav navbar-brand" onClick={ () => { navigate('/'); }}>
            Home </li>
          <li className="nav-item rightNav navbar-brand" onClick={ () => { navigate('/About'); }}>
            About </li>
          <li className="nav-item rightNav navbar-brand" onClick={ () => { navigate('/AddProblem'); }}>
            Add Problem </li>
          <li className="nav-item rightNav navbar-brand" onClick={ () => { navigate('/CodeRunLobby'); }}>
            Code Run </li>
          {/* <a href='/' className='leftNav nav-item navbar-brand'>Home</a>
          <a href='/About' className='leftNav nav-item navbar-brand'>About</a>
          <a href='/AddProblem' className='leftNav nav-item navbar-brand'>Add Problem</a>
          <a href='/CodeRunLobby' className='leftNav nav-item navbar-brand'>Code Run</a> */}
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