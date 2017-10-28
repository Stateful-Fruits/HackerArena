import React from 'react';

const DisruptionsBar = ({
  credits,
  sendDisruptions
}) => (
  <div id="disruptionsBar">
  <button className=" btn disruptionsHeader"><span className="dc badge">{credits}</span> Disruptions</button>
  <button className="btn" id="Blind 1" onClick={sendDisruptions}><span data="" className="d1 badge">1</span> Blind</button>
  <button className="btn" id="Python 1" onClick={sendDisruptions}><span className="d1 badge">1</span> Python</button>
  <button className="btn" id="Kennify 1" onClick={sendDisruptions}><span className="d1 badge">1</span> Kennify</button>
  <button className="btn" id="Fog 3" onClick={sendDisruptions}><span className="d3 badge">3</span> Fog</button>
  <button className="btn" id="Flip 3" onClick={sendDisruptions}><span className="d3 badge">3</span> Flip</button>
  <button className="btn" id="Zoom 3" onClick={sendDisruptions}><span className="d3 badge">3</span> Old Man</button>
  <button className="btn" id="LineBomb 5" onClick={sendDisruptions}><span className="d5 badge">5</span> LineBomb</button>
  <button className="btn" id="Sublime 5" onClick={sendDisruptions}><span className="d5 badge">5</span> Sublime</button>
  <button className="btn" id="Move 5" onClick={sendDisruptions}><span className="d5 badge">5</span> Move</button>
  <button className="btn" id="ActualTimeTravel 5" onClick={sendDisruptions}><span className="d5 badge">5</span> Undo</button>
  <button className="btn" id="Charmin 5" onClick={sendDisruptions}><span className="d5 badge">5</span>Charmin</button>
  <button className="btn" id="Wipe 20" onClick={sendDisruptions}><span className="d10 badge">20</span> Wipe</button>
  </div>
);

export default DisruptionsBar;