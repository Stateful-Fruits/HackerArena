import React from 'react';
import '../Styles/Stats.css';
import Sunburst from 'react-sunburst-d3-v4';

class Stats extends React.Component { 
  
  componentDidMount(){
  }

  render(){
    let data = {
      "name": "Wins/Losses",
      "children": [
        {
          "name": "losses",
          "children":[
            {"name": "data structures", "size": 90},
          ]
        },
        {
          "name": "wins",
          "children": [
            {"name": "data structures", "size": 40},
            {"name": "algorithms", "size": 8},
            {"name": "strings", "size": 10},
            {"name": "graphs", "size": 19},
            {"name": "hahh", "size": 33},

          ]
        }
      ]
    }
      return (
          <Sunburst
          data={data}
          onSelect={this.onSelect}
          scale="linear"
          tooltipContent={ <div className="sunburstTooltip" style={{position: "absolute", color:'black', zIndex: 10, background: "red", padding: "5px", textAlign: "center"}} /> }
          tooltip
          tooltipPosition="right"
          keyId="anagraph"
          width="200"
          height="200"
        />
      )
  }
};

export default Stats;