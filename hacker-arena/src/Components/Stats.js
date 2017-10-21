import React from 'react';
import '../Styles/Stats.css';
import fire from '../Firebase/firebase';
import * as d3 from 'd3';
import Sunburst from 'react-sunburst-d3-v4';

class Stats extends React.Component { 
  constructor(props){
    super(props);
    this.state = {

    }
  }
  componentDidMount(){
    //AN ARRAY OF TAGS FOR EACH PROBLEM
    if(this.props.profile){
      let problemTags = Object.values(this.props.profile.history).map(item => {
        return [item[0].problem.tags];
      })
      console.log(problemTags)
    }

    let data =[]
    if(this.props.profile){

      console.log('STATS PROPS', this.props)
      data = {
        "name": "Wins/Losses",
        "children": [
          {
            "name": "losses",
            "size": (this.props.profile.losses)
          },
          {
            "name": "wins",
            "size": (this.props.profile.wins)
          }
        ]
      }
    }
    // let data = {
    //   "name": "Wins/Losses",
    //   "children": [
    //     {
    //       "name": "losses",
    //       "children":[
    //         {"name": "data structures", "size": 90},
    //         {"name": "something",
    //           "children": [
    //             {"name": "fsdaaaa", "size": 33},
    //             {"name": "yello", "size":15}
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       "name": "wins",
    //       "children": [
    //         {"name": "data structures", "size": 100},
    //         {"name": "algorithms", "size": 80},
    //         {"name": "strings",
    //           "children": [
    //             {"name": "asdfdfsdf", "size": 25},
    //             {"name": "dsfsdfzzzz", "size": 25}
    //           ]},
    //         {"name": "graphs", "size": 29},
    //         {"name": "hahh", "size": 33},

    //       ]
    //     }
    //   ]
    // }
    function computeTextRotation(d) {
        var angle = (d.x0 + d.x1) / Math.PI * 90;

        // Avoid upside-down labels
        return (angle < 120 || angle > 270) ? angle : angle + 180;  // labels as rims
        // return (angle < 180) ? angle - 90 : angle + 90;  // labels as spokes
    }
    function incrementColor(string, name){
      string = string.slice(string.indexOf('(') + 1, string.indexOf(')'));
      let rgb = string.split(',');
      rgb[0] = (parseInt(rgb[0],10) + 6);
      rgb[1] -= 30;
      rgb[2] = (parseInt(rgb[2],10) + 15);
      let newString = 'rgb('+rgb.join(',')+')';
      colors[name] = newString;
      return newString;
    }
    // Variables
    var width = 400;
    var height = 400;
    var radius = Math.min(width, height) / 2;
    // var color = d3.scaleOrdinal(d3.schemeCategory20b);
    var colors = {
      "wins": "rgb(42, 158, 75)",
      "losses": "rgb(204, 76, 44)"
    }

    // Create primary <g> element
    var g = d3.select('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // Data strucure
    var partition = d3.partition()
        .size([2 * Math.PI, radius]);

    // Find data root
    var root = d3.hierarchy(data)
        .sum(function (d) { return d.size});

    // Size arcs
    partition(root);
    var arc = d3.arc()
        .startAngle(function (d) { return d.x0 })
        .endAngle(function (d) { return d.x1 })
        .innerRadius(function (d) { return d.y0 })
        .outerRadius(function (d) { return d.y1 });

    // Put it all together
    g.selectAll('path')
        .data(root.descendants())
        .enter().append('path')
        .attr("display", function (d) { return d.depth ? null : "none"; })
        .attr("d", arc)
        .style('stroke', '#fff')
        .style("fill", function (d) { 
          if(d.parent){
            if(colors[d.parent.data.name]){
              return incrementColor(colors[d.parent.data.name],d.data.name)
            } else {
              return colors[d.data.name];
            }
          } else {
            return colors[d.data.name];
          }
        });

    g.selectAll('g')
      .data(root.descendants())
      .enter().append('g').attr("class", "node").append('path')
      .attr("display", function (d) { return d.depth ? null : "none"; })
      .attr("d", arc)
      .style('stroke', '#fff')
      .style("fill", function (d) { 
        if(d.parent){
          if(colors[d.parent.data.name]){
            return incrementColor(colors[d.parent.data.name],d.data.name);
          } else {
            return colors[d.data.name];
          }
        } else {
          return colors[d.data.name];
        }
      });

    g.selectAll(".node")
    .append("text")
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")"; })
    .attr("dx", "-20") // radius margin
    .attr("dy", ".5em") // rotation align
    .text(function(d) { return d.parent ? d.data.name : "" });
  }

  render(){
      return (
        <div>
          <svg></svg>
          {/* <Sunburst
          data={data}
          onSelect={this.onSelect}
          scale="linear"
          tooltipContent={ <div className="sunburstTooltip" style={{position: "absolute", color:'black', zIndex: 10, background: "red", padding: "5px", textAlign: "center"}} /> }
          tooltip
          tooltipPosition="right"
          keyId="anagraph"
          width="200"
          height="200"
        /> */}
        </div>
      )
  }
};

export default Stats;