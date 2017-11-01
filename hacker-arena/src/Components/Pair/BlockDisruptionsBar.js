import React from 'react';

const BlockDisruptionsBar = ({
  credits,
  clearDisruption
}) => (
  <div id="blockdisruptionsBar">BLOCK DISRUPTIONS
  <button className="btn" id="Blind 0" onClick={clearDisruption}><span className="d1 badge">0</span> Blind</button>
  <button className="btn" id="Python 0" onClick={clearDisruption}><span className="d1 badge">0</span> Python</button>
  <button className="btn" id="Kennify 0" onClick={clearDisruption}><span className="d1 badge">0</span> Kennify</button>
  <button className="btn" id="Fog 1" onClick={clearDisruption}><span className="d3 badge">1</span> Fog</button>
  <button className="btn" id="Flip 1" onClick={clearDisruption}><span className="d3 badge">1</span> Flip</button>
  <button className="btn" id="Zoom 1" onClick={clearDisruption}><span className="d3 badge">1</span> Old Man</button>
  <button className="btn" id="LineBomb 2" onClick={clearDisruption}><span className="d5 badge">2</span> LineBomb</button>
  <button className="btn" id="Sublime 2" onClick={clearDisruption}><span className="d5 badge">2</span> Sublime</button>
  <button className="btn" id="Move 2" onClick={clearDisruption}><span className="d5 badge">2</span> Move</button>
  <button className="btn" id="ActualTimeTravel 2" onClick={clearDisruption}><span className="d5 badge">2</span> Undo</button>
  <button className="btn" id="Charmin 2" onClick={clearDisruption}><span className="d5 badge">2</span>Charmin</button>
  <button className="btn" id="Wipe 10" onClick={clearDisruption}><span className="d10 badge">10</span> Wipe</button>
  </div>
);

export default BlockDisruptionsBar;