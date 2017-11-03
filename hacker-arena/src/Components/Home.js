import React from 'react';
import video from "video.js" // eslint-disable-line no-unused-vars
import Signup from '../Containers/SignUp';
import '../Styles/About.css';
// import twoplayers from '../two player.png'
import fire from '../Firebase/firebase';
import $ from 'jquery';
import HomeHelpers from './HomeHelpers/HomeHelpers';
const Home = (props) => { 
  setTimeout(function(){
    $('.signUpForm2').css('opacity', 1);
    // $('.quoteHome').css('opacity', 1);
  }, 1000)
  let Form;
  let date = HomeHelpers.newDateParser();
  let time = HomeHelpers.getTime();
  let quote = HomeHelpers.quoteGen();
  let status = fire.auth().currentUser? fire.auth().currentUser.email.split('@')[0]:false;
    if(status) {Form = 
    <div className="signUpForm2">
      <h5>Welcome, {status}!</h5>
      <h2 id="time">{time}</h2>
      <h3>{date[0]}</h3>
      <h4>{date.slice(1,4).join(' ')}</h4>
      <br />
      {/* <div className="quoteHome"> */}
      <h5><em>{quote[0]}</em></h5>
      <h5>{quote[1]}</h5>
      {/* </div> */}
    </div>
    }
    else{Form = <Signup/>}
    
  $(document).ready(function(){

    var getMax = function(){
        return $(document).height() - $(window).height();
    }
    var getValue = function(){
        return $(window).scrollTop();
    }
    var progressBar;
    if('max' in document.createElement('progress')){
        progressBar = $('progress');  
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
      } else {
        progressBar = $('.progress-bar');
        var max = getMax(), 
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
    <div className="gameModes">
      <div className="features">
        <h1 style={{'fontWeight': 400, 'fontSize': '50px', 'margin': '35px'}}><strong>Game Modes</strong></h1>
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item">
            <a className="pills card nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-classic" role="tab" aria-controls="pills-home" aria-selected="true">
              <h2 className="card-title"> Classic </h2>
              <img className="card-img-top aboutIcons" alt='classic' src='/assets/classic.png' />
            </a>
          </li>
          <li className="nav-item">
            <a className="pills card nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-pair" role="tab" aria-controls="pills-profile" aria-selected="false">
              <h2 className="card-title"> Pair </h2>
              <img className="card-img-top aboutIcons" alt='pair' src='/assets/pair.png' />
            </a>
          
          </li>
          <li className="nav-item">
            <a className="pills card nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-coderun" role="tab" aria-controls="pills-contact" aria-selected="false">
            <h2 className="card-title"> Code Run </h2>
              <img className="card-img-top aboutIcons" alt='codeRun' src='/assets/coderun.png' />
            </a>
          </li>
          <li className="nav-item">
            <a className="pills card nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-solo" role="tab" aria-controls="pills-contact" aria-selected="false">

            <h2 className="card-title"> Solo </h2>
              <img className="card-img-top aboutIcons" alt='solo' src='/assets/solo.png' />
            </a>
          </li>
        </ul>

        <div className="tab-content" id="pills-tabContent">
          <div className="tab-pane fade show active" id="pills-classic" role="tabpanel" aria-labelledby="pills-home-tab">
          <div className="classicSnaps"></div>
            <h3> <strong>Classic Mode</strong></h3>
            <h5><em>Programmers face off against each other in a race to finish the coding challenge first.</em></h5>
            <h5><strong>Suggested Players: </strong>2+</h5>
            <h5><strong>Instructions: </strong> 
            
            <br/>
            </h5>
            <h5 className="text-muted"> Estimated Time: 10 mins </h5>
          </div>
          <div className="tab-pane fade" id="pills-pair" role="tabpanel" aria-labelledby="pills-profile-tab">
          <div className="pairSnaps"></div>
            <h3> <strong>Pair Mode</strong></h3>
            <h5><em>Players fall into the role of Navigator or Driver, </em></h5>
            <h5><strong>Suggested Players: </strong>4+</h5>
            <h5><strong>Instructions: </strong> 
            
            <br/>
            </h5>
            <h5 className="text-muted"> Estimated Time: 15 mins </h5>
          </div>
          <div className="tab-pane fade" id="pills-coderun" role="tabpanel" aria-labelledby="pills-contact-tab">
          <div className="codeRunSnaps"></div>
          <h3> <strong>Code Run</strong></h3>
            <h5><em>Players traverse a board, utilizing items, environment and disruptions to reach the finish line.</em></h5>
            <h5><strong>Suggested Players: </strong>2+</h5>
            <h5><strong>Instructions: </strong> 
            <br/>
            </h5>
            <h5 className="text-muted"> Estimated Time: 10 mins </h5>
          </div>
          <div className="tab-pane fade" id="pills-solo" role="tabpanel" aria-labelledby="pills-contact-tab">
          <div className="soloSnaps"></div>
            <h3><strong>Solo Mode</strong></h3>
            <h5><em>Programmers can hone their skills by practicing alone in this sandbox mode.</em></h5>
            <h5><strong>Suggested Players: </strong>1</h5>
            <h5><strong>Instructions: </strong> 
            <br/>
            </h5>
            <h5 className="text-muted"> Estimated Time: 5 mins </h5>
          </div>
        </div>

      </div>
    </div>

    <div className="disruptionsHome">
    <h1 style={{'fontWeight': 400, 'fontSize': '50px', 'margin': '35px'}}> <strong>Disruptions</strong> </h1>
    <div id="homeDisruptions">
    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{marginTop: '38px'}}>
      <a className="nav-link active btn disruptionsHeader" id="v-pills-disruptions-tab" data-toggle="pill" href="#v-pills-disruptions" role="tab" aria-controls="v-pills-disruptions" aria-selected="true">
        <span className="dc badge"></span> Disruptions
      </a>
      <a className="btn nav-link" id="v-pills-blind-tab" data-toggle="pill" href="#v-pills-blind" role="tab" aria-controls="v-pills-blind" aria-selected="false">
        <span className="d1 badge">1</span> Blind
      </a>
      <a className="btn nav-link" id="v-pills-python-tab" data-toggle="pill" href="#v-pills-python" role="tab" aria-controls="v-pills-python" aria-selected="false">
        <span className="d1 badge">1</span> Python
      </a>
      <a className="btn nav-link" id="v-pills-kennify-tab" data-toggle="pill" href="#v-pills-kennify" role="tab" aria-controls="v-pills-kennify" aria-selected="false">
        <span className="d1 badge">1</span> Kennify
      </a>
      <a className="btn nav-link" id="v-pills-fog-tab" data-toggle="pill" href="#v-pills-fog" role="tab" aria-controls="v-pills-fog" aria-selected="false">
        <span className="d3 badge">3</span> Fog
      </a>
      <a className="btn nav-link" id="v-pills-flip-tab" data-toggle="pill" href="#v-pills-flip" role="tab" aria-controls="v-pills-flip" aria-selected="false">
        <span className="d3 badge">3</span> Flip
      </a>
      <a className="btn nav-link" id="v-pills-oldman-tab" data-toggle="pill" href="#v-pills-oldman" role="tab" aria-controls="v-pills-oldman" aria-selected="false">        
        <span className="d3 badge">3</span> Old Man
      </a>
      <a className="btn nav-link" id="v-pills-linebomb-tab" data-toggle="pill" href="#v-pills-linebomb" role="tab" aria-controls="v-pills-linebomb" aria-selected="false">
        <span className="d5 badge">5</span> LineBomb
      </a>
      <a className="btn nav-link" id="v-pills-sublime-tab" data-toggle="pill" href="#v-pills-sublime" role="tab" aria-controls="v-pills-sublime" aria-selected="false">
        <span className="d5 badge">5</span> Sublime
      </a>    
      <a className="btn nav-link" id="v-pills-move-tab" data-toggle="pill" href="#v-pills-move" role="tab" aria-controls="v-pills-move" aria-selected="false">
        <span className="d5 badge">5</span> Move
      </a>
      <a className="btn nav-link" id="v-pills-undo-tab" data-toggle="pill" href="#v-pills-undo" role="tab" aria-controls="v-pills-undo" aria-selected="false">
        <span className="d5 badge">5</span> Undo
      </a>
      <a className="btn nav-link" id="v-pills-charmin-tab" data-toggle="pill" href="#v-pills-charmin" role="tab" aria-controls="v-pills-charmin" aria-selected="false">
        <span className="d5 badge">5</span> Charmin
      </a>
      <a className="btn nav-link" id="v-pills-wipe-tab" data-toggle="pill" href="#v-pills-wipe" role="tab" aria-controls="v-pills-wipe" aria-selected="false">
        <span className="d10 badge">20</span> Wipe
      </a>
    </div>
    <div className="tab-content" id="v-pills-tabContent">
      <div className="tab-pane vertPane disruptionsPane fade show active" id="v-pills-disruptions" role="tabpanel" aria-labelledby="v-pills-disruption">
        <h1><strong>Disruptions</strong></h1>
        <h3>Click on a tab to explore disruptions!</h3>
        <img style={{height: '80px'}} alt='disruption' src="/assets/leftArrow.png" />
      </div>
      <div className="tab-pane vertPane fade" id="v-pills-blind" role="tabpanel" aria-labelledby="v-pills-blind">
        <h3 className="disPrevHeader"><strong>Blind</strong></h3>
        <h5> Cost: <span className="d1 badge">1</span> </h5>
        <h5><strong>Effect: </strong>Darkens opponent's editor for 5 seconds.</h5>
        <h5><em>Ahhhhh! Help I can't C...++</em></h5>
        <img src ="/assets/Blind.gif" alt='disruption'/>
      </div>
      <div className="tab-pane vertPane fade" id="v-pills-python" role="tabpanel" aria-labelledby="v-pills-python">
        <h3 className="disPrevHeader"><strong>Python</strong></h3>
        <h5> Cost: <span className="d1 badge">1</span> </h5>
        <h5><strong>Effect: </strong>Changes opponent's editor language to Python for 5 seconds.</h5>
        <h5><em>Do snakes have really long tails or just really long necks?...</em></h5>
        <img src ="/assets/Python.gif" alt='disruption'/>
      </div>
      <div className="tab-pane vertPane fade" id="v-pills-kennify" role="tabpanel" aria-labelledby="v-pills-kennify">
        <h3 className="disPrevHeader"><strong>Kennify</strong></h3>
        <h5> Cost: <span className="d1 badge">1</span> </h5>
        <h5><strong>Effect: </strong>Gives opponent the K-Dawg special for 5 seconds.</h5>
        <h5><em>"I'm late" - Kenneth Tso</em></h5>
        <img src ="/assets/Kennify.gif" alt='disruption'/>
      </div>
      <div className="tab-pane vertPane fade" id="v-pills-fog" role="tabpanel" aria-labelledby="v-pills-fog">
        <h3 className="disPrevHeader"><strong>Fog</strong></h3>
        <h5> Cost: <span className="d3 badge">3</span> </h5>
        <h5><strong>Effect: </strong>Blur opponent's editor for 5 seconds.</h5>
        <h5><em>20/20 2 400/20 4 5</em></h5>
        <img style={{width: '800px', height: '500px'}}src ="/assets/Blur.gif" alt='disruption'/>
      </div>
      <div className="tab-pane vertPane fade" id="v-pills-flip" role="tabpanel" aria-labelledby="v-pills-flip">
        <h3 className="disPrevHeader"><strong>Flip</strong></h3>
        <h5> Cost: <span className="d3 badge">3</span> </h5>
        <h5><strong>Effect: </strong>Flips opponent's editor for 5 seconds.</h5>
        <h5><em>{"Flips opponent's editor for 5 seconds.".split('').reverse().join('')}</em></h5>
        <img src ="/assets/Flip.gif" alt='disruption'/>
      </div>
      <div className="tab-pane vertPane fade" id="v-pills-oldman" role="tabpanel" aria-labelledby="v-pills-oldman">
        <h3 className="disPrevHeader"><strong>Old Man</strong></h3>
        <h5> Cost: <span className="d3 badge">3</span> </h5>
        <h5><strong>Effect: </strong>Increase zoom on opponent's editor.</h5>
        <h5><em>Get off my lawn!</em></h5>
        <img src ="/assets/OldMan.gif" alt='disruption'/>
      </div>
      <div className="tab-pane vertPane fade" id="v-pills-linebomb" role="tabpanel" aria-labelledby="v-pills-linebomb">
        <h3 className="disPrevHeader"><strong>Line Bomb</strong></h3>
        <h5> Cost: <span className="d5 badge">5</span> </h5>
        <h5><strong>Effect: </strong>Inserts random lines of letters into opponent's editor.</h5>
        <h5><em>fsdofijfoidjfoijfaodifdofjaodifjda?</em></h5>
        <img src ="/assets/LineBomb.gif" alt='disruption'/>
      </div>
      <div className="tab-pane vertPane fade" id="v-pills-sublime" role="tabpanel" aria-labelledby="v-pills-sublime">
        <h3 className="disPrevHeader"><strong>Sublime</strong></h3>
        <h5> Cost: <span className="d5 badge">5</span> </h5>
        <h5><strong>Effect: </strong>Display alert to opponent on text input for 5 seconds.</h5>
        <h5><em>Sponsored by VSCode&copy;</em></h5>
        <img src ="/assets/Sublime.gif" alt='disruption'/>
      </div>
      <div className="tab-pane vertPane fade" id="v-pills-move" role="tabpanel" aria-labelledby="v-pills-move">
        <h3 className="disPrevHeader"><strong>Move</strong></h3>
        <h5> Cost: <span className="d5 badge">5</span> </h5>
        <h5><strong>Effect: </strong>Moves opponent's editor for 5 seconds.</h5>
        <h5><em>Catch me if you can!</em></h5>
        <img src ="/assets/Move.gif" alt='disruption'/>
      </div>
      <div className="tab-pane vertPane fade" id="v-pills-undo" role="tabpanel" aria-labelledby="v-pills-undo">
        <h3 className="disPrevHeader"><strong>Undo</strong></h3>
        <h5> Cost: <span className="d5 badge">5</span> </h5>
        <h5><strong>Effect: </strong>Deletes the last 10 entires the opponent has made.</h5>
        <h5><em>Ooooops</em></h5>
        <img src ="/assets/Undo.gif" alt='disruption'/>
      </div>
      <div className="tab-pane vertPane fade" id="v-pills-charmin" role="tabpanel" aria-labelledby="v-pills-charmin">
        <h3 className="disPrevHeader"><strong>Charmin</strong></h3>
        <h5> Cost: <span className="d5 badge">5</span> </h5>
        <h5><strong>Effect: </strong>Displays a full length Charmin ad to opponent.</h5>
        <h5><em>Sponsored by Charmin&copy;</em></h5>
        <img src ="/assets/Charmin.gif" alt='disruption'/>
      </div>
      <div className="tab-pane vertPane fade" id="v-pills-wipe" role="tabpanel" aria-labelledby="v-pills-wipe">
      <h3 className="disPrevHeader"><strong>Wipe</strong></h3>
      <h5> Cost: <span className="d10 badge">20</span> </h5>
      <h5><strong>Effect: </strong>Clears and resets opponent's editor.</h5>
      <h5><em>Not to be confused with Charmin</em></h5>
      <img src ="/assets/Wipe.gif" alt='disruption'/>
      </div>
    </div>
      </div>
    </div>
    {/* {<video style={{position:'relative'}} className ="video" autoPlay muted loop>
    <source src="/assets/aboutVideo.mp4" type="video/mp4"/>
    </video> } */}
    
      <h1 className="teamHeader" style={{'fontWeight': 400, 'fontSize': '50px', 'margin': '35px'}}> <strong>Team</strong> </h1>
    <div className="team card-deck">  
    <div className="card teamCard">
      <img className="card-img-top teamPics" src="https://tctechcrunch2011.files.wordpress.com/2012/09/mark.jpeg" alt="Card cap"/>
      <div className="card-block">
        <h4 className="card-title">Simon Zheng</h4>
        <p className="card-text">I did these things for this project</p>
        <p className="card-text">Contact Information sits here</p>
        <p className="card-text"><small className="text-muted">Maybe some sort of fun facts / info on person</small></p>
      </div>
    </div>
    <div className="card teamCard">
      <img className="card-img-top teamPics" src="https://i.ytimg.com/vi/LIMPxPdS4BE/maxresdefault.jpg" alt="Card cap"/>
      <div className="card-block">
        <h4 className="card-title">Kai Chen</h4>
        <p className="card-text">I did these things for this project</p>
        <p className="card-text">Contact Information sits here</p>
        <p className="card-text"><small className="text-muted">Maybe some sort of fun facts / info on person</small></p>
      </div>
    </div>
    <div className="card teamCard">
      <img className="card-img-top teamPics" src="https://www.theinquirer.net/w-images/0166cafa-de8b-44d6-91b4-6f210d34ddbf/1/googlealphagologo-580x358.png" alt="Card cap"/>
      <div className="card-block">
        <h4 className="card-title">Colin Crawford</h4>
        <p className="card-text">I did these things for this project</p>
        <p className="card-text">Contact Information sits here</p>
        <p className="card-text"><small className="text-muted">Maybe some sort of fun facts / info on person</small></p>
      </div>
    </div>
    <div className="card teamCard">
      <img className="card-img-top teamPics" src="https://www.organicfacts.net/wp-content/uploads/2013/05/Banana3-1020x765.jpg" alt="Card cap"/>
      <div className="card-block">
        <h4 className="card-title">Paul Brown</h4>
        <p className="card-text">I did these things for this project</p>
        <p className="card-text">Contact Information sits here</p>
        <p className="card-text"><small className="text-muted">Maybe some sort of fun facts / info on person</small></p>
      </div>
    </div>
    <div className="card teamCard">
      <img className="card-img-top teamPics" src="http://www.desartlab.com/wp-content/uploads/2015/10/jquery_logo.gif" alt="Card cap"/>
      <div className="card-block">
        <h4 className="card-title">David Zou</h4>
        <p className="card-text">I did these things for this project</p>
        <p className="card-text">Contact Information sits here</p>
        <p className="card-text"><small className="text-muted">Maybe some sort of fun facts / info on person</small></p>
      </div>
    </div>
    </div>
    

    <div className="aboutFooter">
      <h3 className="">Hey its me the footer</h3>
    </div>
  </div>
)};

export default Home;