import React from 'react';
import video from "video.js"
import '../Styles/About.css';
const About = (props) => {  
  return (
  <div>
    <h2>This is a game for coders to compete against each other!</h2>
    
    <div>
    <video style={{position:'relative'}} className ="video" autoPlay muted loop>
    <source src="/assets/aboutVideo.mp4" type="video/mp4"/>
    </video>
    </div>
    <div style={{position: "absolute"}}>
      <h3>TESTING</h3>
      </div>
  </div>
)};

export default About;