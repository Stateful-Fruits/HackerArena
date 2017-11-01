import React from 'react';
import video from "video.js"
import Signup from '../Containers/SignUp';
import '../Styles/About.css';
import twoplayers from '../two player.png'

const Home = (props) => { 
  return (
  <div>
    <div className="hero">
      <Signup />
    </div>
    <div>
    <div className="features">
      {/* Connect and Code.
      NETWORK LOGO HERE
      Hacker Arena is a platform for programmers 
      MODE NAME
      MODE LOGO
      MODE DESCRIPTION
        players? : (1 , 2-4, 2-6);
        instructions:
      CLASSIC 
      PAIR MATCH
      CODE RUN

      HONE YOUR SKILLS
      SOLO
      Players: 1
      A mode for players to practice alone,  */}
    </div>
    {<video style={{position:'relative'}} className ="video" autoPlay muted loop>
    <source src="/assets/aboutVideo.mp4" type="video/mp4"/>
    </video> }
    </div>
      <h2 className="teamHeader"> Hey Yall its the Team </h2>
    <div className="team card-deck">  
    <div className="card teamCard">
      <img className="card-img-top teamPics" src="https://tctechcrunch2011.files.wordpress.com/2012/09/mark.jpeg" alt="Card image cap"/>
      <div className="card-block">
        <h4 className="card-title">Name of Person right here</h4>
        <p className="card-text">I did these things for this project</p>
        <p className="card-text">Contact Information sits here</p>
        <p className="card-text"><small className="text-muted">Maybe some sort of fun facts / info on person</small></p>
      </div>
    </div>
    <div className="card teamCard">
      <img className="card-img-top teamPics" src="https://i.ytimg.com/vi/LIMPxPdS4BE/maxresdefault.jpg" alt="Card image cap"/>
      <div className="card-block">
        <h4 className="card-title">Name of Person right here</h4>
        <p className="card-text">I did these things for this project</p>
        <p className="card-text">Contact Information sits here</p>
        <p className="card-text"><small className="text-muted">Maybe some sort of fun facts / info on person</small></p>
      </div>
    </div>
    <div className="card teamCard">
      <img className="card-img-top teamPics" src="https://www.theinquirer.net/w-images/0166cafa-de8b-44d6-91b4-6f210d34ddbf/1/googlealphagologo-580x358.png" alt="Card image cap"/>
      <div className="card-block">
        <h4 className="card-title">Name of Person right here</h4>
        <p className="card-text">I did these things for this project</p>
        <p className="card-text">Contact Information sits here</p>
        <p className="card-text"><small className="text-muted">Maybe some sort of fun facts / info on person</small></p>
      </div>
    </div>
    <div className="card teamCard">
      <img className="card-img-top teamPics" src="https://www.organicfacts.net/wp-content/uploads/2013/05/Banana3-1020x765.jpg" alt="Card image cap"/>
      <div className="card-block">
        <h4 className="card-title">Name of Person right here</h4>
        <p className="card-text">I did these things for this project</p>
        <p className="card-text">Contact Information sits here</p>
        <p className="card-text"><small className="text-muted">Maybe some sort of fun facts / info on person</small></p>
      </div>
    </div>
    <div className="card teamCard">
      <img className="card-img-top teamPics" src="http://www.desartlab.com/wp-content/uploads/2015/10/jquery_logo.gif" alt="Card image cap"/>
      <div className="card-block">
        <h4 className="card-title">Name of Person right here</h4>
        <p className="card-text">I did these things for this project</p>
        <p className="card-text">Contact Information sits here</p>
        <p className="card-text"><small className="text-muted">Maybe some sort of fun facts / info on person</small></p>
      </div>
    </div>
    </div>
  <section >
    <div>
      
          <h1>Two Player Game Fun</h1>
          <p>In this mode, You will be joining in a game to play against one opponent.</p>
          <h3> Whoever Solves the problem Win the game</h3>        
        </div>   
        <div className='background-content'></div>
  </section>
 
 <img src= {twoplayers} alt ='no img'/> 

 <section >
    <div>
      
          <h1>Wanna Play With Board Game? No Problem</h1>
          <p>In this mode, You will be joining in a game to play against one opponent.</p>
          <h2>The Rule</h2>
          <h3> Whoever hit the finish line first wins the game</h3>        
        </div>   
  </section>
    

    <div className="aboutFooter">
      <h3 className="">Hey its me the footer</h3>
    </div>
  </div>
)};

export default Home;