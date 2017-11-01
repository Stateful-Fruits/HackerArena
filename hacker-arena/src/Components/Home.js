import React from 'react';
import video from "video.js"
import Signup from '../Containers/SignUp';
import '../Styles/About.css';
import twoplayers from '../two player.png'
import fire from '../Firebase/firebase';
import $ from 'jquery';
const Home = (props) => { 
  let Form =null
  let status = fire.auth().currentUser? fire.auth().currentUser.email.split('@')[0]:false;
    if(status) {Form = <div>Hi {status}</div>}
    else{Form = <Signup/>}
    
  $(document).ready(function(){

    var getMax = function(){
        return $(document).height() - $(window).height();
    }
    var getValue = function(){
        return $(window).scrollTop();
    }
    if('max' in document.createElement('progress')){
        var progressBar = $('progress');  
        // Set the Max attr for the first time
        progressBar.attr({ max: getMax() });
        $(document).on('scroll', function(){
          if(window.scrollY > 120){
            progressBar.attr({ value: getValue() });
          }
        });
        if(window.scrollY > 120){
        $(window).resize(function(){
            progressBar.attr({ max: getMax(), value: getValue() });
        }) };   
    }
    else {
        var progressBar = $('.progress-bar'), 
            max = getMax(), 
            value, width;
        var getWidth = function(){
            // Calculate width in percentage
            value = getValue();            
            width = (value/max) * 100;
            width = width + '%';
            return width;
        }  
        var setWidth = function(){
            progressBar.css({ width: getWidth() });
        }
        $(document).on('scroll', setWidth);
        $(window).on('resize', function(){
            // Need to reset the Max attr
            if(window.scrollY > 120){
            max = getMax();
            setWidth();
            }
        });
    }

  });
  $(window).on('scroll', () => {
  if(window.scrollY < 100){
    $('#progressBar').css('opacity', '0');
  } else {
    $('#progressBar').css('opacity', '1');
  }
  })
  return (
  <div>
    <progress className="" value="0" id="progressBar">
  <div className="">
    <span className=""></span>
  </div>
</progress>
    <div className="hero">  
      <div>
          <h4  style={{position: 'absolute'}} > Connect and Code </h4>
        </div>
      {Form}
    </div>
    <div className="introduction">
      what does this app do?
      purpose 
    </div>
    <div>
      <div className="features">
        <h1> Game Modes </h1>
        <div className="card-deck">
          <div className="card">
              <h2 className="card-title"> Classic </h2>
            <img className="card-img-top aboutIcons" src='/assets/classic.png' />
            <div className="card-block">
              <p className="card-text">Hey heres our classic mode, lets describe this sometime afd</p>
            </div>
          </div>
          <div className="card">
              <h2 className="card-title"> Pair </h2>
            <img className="card-img-top aboutIcons"  src='/assets/pair.png' />
            <div className="card-block">
              <p className="card-text"> Pair match, its like tinder but for coders adofiajsdfosijfodsijfsodfijsdofij </p>
            </div>
          </div>
          <div className="card">
              <h2 className="card-title"> Code Run </h2>
            <img className="card-img-top aboutIcons" src='/assets/coderun.png' />
            <div className="card-block">
              <p className="card-text"> Code Run, Kais game mode heres some filler text adoisjdsdijfoasfjsodfijoj </p>
            </div>
          </div>
          <div className="card">
              <h2 className="card-title"> Solo </h2>
            <img className="card-img-top aboutIcons" src='/assets/solo.png' />
            <div className="card-block">
              <p className="card-text"> Get better here sfsadfsdfsdfsdfsdfsafadsfsdfaf </p>
            </div>
          </div>
          <div className="card">
              <h2 className="card-title"> Random </h2>
            <img className="card-img-top aboutIcons" src='/assets/random.png' />
            <div className="card-block">
              <p className="card-text"> Hey who put this here aaaaaaaaaaasdfsdsdfsdsdfsdffsfd</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {<video style={{position:'relative'}} className ="video" autoPlay muted loop>
    <source src="/assets/aboutVideo.mp4" type="video/mp4"/>
    </video> }
    
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