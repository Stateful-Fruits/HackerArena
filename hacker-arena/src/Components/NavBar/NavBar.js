import React, {Component} from 'react';
import $ from 'jquery';

import fire from '../../Firebase/firebase';

class NavBar extends Component {
  componentDidMount(){
    $(".navbar-nav li").on("click", function() {
      $(".navbar-nav li").removeClass("active");
      $(this).addClass("active");
    });
  }
  render() {
    let { navigate, currentUser } = this.props;
    let isAdmin = currentUser ? currentUser.adminStatus : null;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav ml-auto mr-auto">
          <li className="nav-item rightNav navbar-brand active" onClick={ () => { navigate('/'); }}>
            Home </li>
          <li className="nav-item rightNav navbar-brand" onClick={ () => { navigate('/About'); }}>
            About </li>
          {isAdmin ? 
            <li 
              className="nav-item rightNav navbar-brand" 
              onClick={ () => navigate('/AddProblem')}
            >
            Add Problem </li>
            :
            null
          }
          <li className="nav-item rightNav navbar-brand" onClick={ () => { navigate('/CodeRunLobby'); }}>
            Code Run </li>
          <li className="nav-item rightNav navbar-brand" onClick={ () => { navigate('/Pair'); }}>
          Pair Match </li>
          <li className="nav-item rightNav navbar-brand" onClick={ () => { navigate('/Solo'); }}>
          Solo </li>
          <li className="nav-item rightNav navbar-brand" onClick={ () => { navigate('/Random'); }}>
          Random </li>
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