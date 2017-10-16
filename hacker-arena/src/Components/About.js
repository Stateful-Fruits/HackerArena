import React from 'react';
import video from "video.js"
import '../Styles/About.css';
const About = (props) => {  
  return (
  <div>
    
    <h2>This is a game for coders to compete against each other!</h2>
    <video className ="video" autoPlay muted loop>
    <source src="https://www.dropbox.com/s/nzk09kfbcxv9cqq/We-Work-We-Wait.mp4?raw=1" type="video/mp4"/>
    </video>
  </div>
)};

export default About;