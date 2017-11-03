import React, { Component } from 'react';

class WaitingForPlayer extends Component { 
  render() {
    let playerSpans = [];
    if (this.props.room) {
      let { room, teams } = this.props;
      let { playerCapacity } = room;
      let players = room.players || {};
      let playerNames = Object.keys(players);

      if (room.isPairRoom) {
        for (let i = 0; i < room.maxPairs; i++) {
          playerSpans.push(
            <li className='list-group-item' key={'team' + i}>
              <h4>
                Team {i} -> {
                  <div>
                    <div>
                      Driver: {
                        teams[i] && teams[i].driver ? 
                          teams[i].driver
                          : 
                          <span style={{color: 'darkgreen'}}>
                            OPEN
                          </span>
                      }
                    </div>
                    <div>
                      Navigator: {
                        teams[i] && teams[i].navigator ? 
                          teams[i].navigator 
                          :
                          <span style={{color: 'darkgreen'}}>
                          OPEN
                          </span>                  
                      }
                    </div>
                  </div>
                }
              </h4>
            </li>
          );
        }
      } else {
        for (let i = 0; i < playerCapacity; i++) {
          playerSpans.push(
            <li className='list-group-item' key={(playerNames[i] || "OPEN") + i}>
              <h4>
              { playerNames[i] ? <span style={{ fontSize: '1.5em' }}><img alt='player present' style={{ width: '50px', height: '50px' }} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAACYCAMAAAAvHNATAAAAh1BMVEX///8AAAALCwsHBwf8/PwoKCjm5uYRERHGxsYXFxfc3Nz19fUEBAQ2Njbs7Ozr6+u/v79YWFgvLy+Tk5NGRkYbGxsnJydBQUGnp6exsbFnZ2fd3d1LS0uZmZnS0tKdnZ2MjIxwcHB/f39QUFCurq5eXl6GhoY7OztsbGy5ublaWlrNzc3Dw8NhhONwAAAFVUlEQVR4nN2ciZaiOhBAO2EngMi+KAi2jT79/+8bGE9P6zRqtgo9736A5x6SVCqVim9v4pin+JhkDvawkyXH+GRK+E1hdLfdZxa6xTL2ba0v7GVXKZojrewFrcgp0Wa1JrTkRBbycivrodbvIa3cJbRIOz+IdwNaqJ9qdfV4FG/Gs1K9Ql3fo/BCyBtqpV62QaU1EalcnmFG7YVQFirzclm8RjNVo1n7TF4I+WrMyJrRC6H/lITamCZO3KPFCrwadi+EcAPuFbAP5MQ6gBYreD7YOJgFsFcQcXmNKxN4/heYUwzDfjKSc3ohlIN+sjO3F0KgC7MXEOsBvUzWzegWHzA1s3mn/oQFmP9sBbwQ2sKJ8UX9T9ZgXjpvdL0SgZ1MzNfnomekKygx+/k58hXWGUrsJLIox13pBCX2LihWQolxpjyfwKU+P1ZMdCjfocR+7OS/CIYLsM2yFgywYOmFzlYa+BsDrli2ERLbgHm97YTEdnBiociyxBc4sZq+XvedCLDmo1cCYkfIQnEoIAY4kuOBlz9gGLA1Ao7i2BUN8CgyYfJOfwO64M8bynbAXm8mX1klATuI/OHEM8s0sIznC72iu6y5xatUXHat2Aczhx/ICZs1mGWqrpNCtkzWUneZVDgMXg50wfoGvaU3c9Te8oa06X8KunfPcE5oooaXgBVSHmJ2r828bpGmlfBVQMvVLcd7zK3xpCEk2i7Y42PGj6qfUbxw65Fud/7fZyfsd/bSTUeTmmlvD0OWOpZlOWk2HLa2+QO0Pgncsx3aZxf8wvT/gk5IMEHIDxpFM2z7ap/7URT5+b7q23D5XkDSFFVk4fs9wMNWVBXNUm1to5W7Sx7u5V6a7NxF3IIieVX7wZtC9SLV3f7JbvSFZvSuytVg9vQHcqNXthRWMUtmPeawsZJDEil91iOvNpTwy2DV8ZQ7cQf90U68BTIDtEhAGGfXLc4WbjhXVL2vj9AqqKB2FrurH7NamCNTKOo1mkGcTqiPuM9IpZvp72JXgp84pdwdSi9kfK8JyQ3rpZzvNWHJDGi2rO81kcor4zUibWPf8WU9jBBqZ5tjkJMIcbbkPkNOu67Yte48OwleEhfkF5Z4m48pvhHNEYlOMyJyp/uMSjAJEmuXfILXCnk1IrfzzzGEohnUQE4cBbyE+ixegflToECsZeYVG+4w24J6IcQ7/124mX+Ft3dlx36Vy4a34/IKZCZh86Q8s0yPoT/Y+MlijjwbaJO8x+coaYBtRnewN9asZKet8wzMn6yEDPpfsPfGys+n52F9FmFC5K1zWIxjGSvyYp3+Af9TMlZypiAr9ACJDcx0MO+UebE9PQvUBLErLC8vL/w1YHYchl6WD4VeTMdydWtyIqH2IurW5ASmnmQnpV4IUe+XIu9OeaANGGSvWGxNOZa12NMQdmjbnc9iD7bY0SivcgrFXghRtld2ysUoZz9sxWIOuodBRMW57Z6Ialky/pWLDDKqIp7S1OKKQ5UsvquOFrQvL9Ucwe+hqpSp3iknPmjEIAvCj6AqFKvewieozuPJAmJUSazKE9InPo2Y+vg6Jj40YvCl1++kNGLqAz+lmKoC1C3OPy2mqpZ4C1UcaxbIx+j+BalRncJuaP+dibTMjZv8aEPLUIcyi9yCv7FByLOSgrWfwI030BHN2cRcF+OkLo9DBjOoWjYcy1qgxYE05cc+wzKH1cPZ/qOU0+4fXLbdeshEy2Y4G9bd9iK565Ssatcu4/6QR0bqWJhuiDVsOakR5Yc+Lm23DkB7ronZ2GFZtLu+O0xPRX57Ym0abk/DVxM/3x+6ftcWZWg3Jo/OL1x6YU8uVFjtAAAAAElFTkSuQmCC'/>
              { '   ' + playerNames[i] }</span> : <span style={{color: 'darkgreen', fontSize: '1.5em'}}><img alt='player not present' style={{ width: '50px', height: '50px' }} src='http://1.bp.blogspot.com/-ztQMI-PgiOQ/Ud8_CPcNn1I/AAAAAAAApE0/sjeNZYuemmg/s1600/Question_mark_(black_on_white).png'/>
              {'   '} OPEN</span> }
              </h4>
            </li>
          );
        }
      }
    }

    return (
      <div>
        <h3>Waiting For Players</h3>
        <ul style={{ margin: '10%', marginBottom: '5%', marginTop: '5%'}}>
          { this.props.room ? playerSpans : null}
        </ul>
        <h3> Waiting... </h3>
        <img src="https://i.imgur.com/joQlpTb.gif" alt='waiting' style={{marginTop: '-3%'}} />
        {/* <i className="fa fa-circle-o-notch fa-spin" style={{fontSize: "300px", color: 'grey'}}></i> */}
      </div>
    );
  }
}

export default WaitingForPlayer;