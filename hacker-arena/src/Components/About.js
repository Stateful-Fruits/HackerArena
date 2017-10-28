import React from 'react';
import video from "video.js"
import '../Styles/About.css';
import twoplayers from '../two player.png'
const About = (props) => {  
  return (
  <div>
    <div className ='player'>
    <h2>This is a game for coders to compete against each other!</h2>
    <video style={{position:'relative'}} className ="video" autoPlay muted loop>
    <source src="/assets/aboutVideo.mp4" type="video/mp4"/>
    </video>
    </div>
    <div style={{position: "absolute"}}>
      <h3>TESTING</h3>
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
  </div>
)};

export default About;