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
    let losses, wins, lossesByTags, winsByTags = [];
    // FIND LOSSES AND WINS BY TAGS
    // 
    if(this.props.profile){
      wins = Object.values(this.props.profile.history).filter(game => {
        return game[0].winner === this.props.profile.username;
      })
      console.log('wins', wins);
      winsByTags = wins.map(item => {
        console.log("the problem", item[0]);
        return [item[0].problem.tags.replace(/ /g, "").split(',')];
      })
      console.log('winsbyTag', winsByTags)
      losses = Object.values(this.props.profile.history).filter(game => {
        return game[0].winner !== this.props.profile.username;
      })
      console.log('losses', losses)
      lossesByTags = losses.map(item => {
        return [item[0].problem.tags.replace(/ /g, "").split(',')];
      })
      console.log('lossesbytags', lossesByTags);
    
      let winData = {
        "name": "Wins",
        "children": [
          {
            "name": "Untagged",
            "size": (this.props.profile.wins - wins.length),
            "children": []
          }
        ]
      }
      let lossData = {
        "name": "Losses",
        "children": [
          {
            "name": "Untagged",
            "size": (this.props.profile.losses - losses.length),
            "children": []
          }
        ]
      }
      
      // Create nesting for win tags
      function generateWinTagLineage(){
        for (let i = 0 ; i < winsByTags.length ; i++){
          generateTagLineage(winData, winsByTags[i]);
        }
      }
      generateWinTagLineage();
      // Create nesting for loss tags
      function generateLossTagLineage(){
        for (let i = 0 ; i < lossesByTags.length ; i++){
          generateTagLineage(lossData, lossesByTags[i]);
        }
      }
      generateLossTagLineage();

      //
      function generateTagLineage(theData, tagArr){
        var last = false;
        let parents = theData;
        for (let i = 0 ; i < tagArr[0].length ; i++){
          if(i === (tagArr[0].length - 1)) {
            last = true;
          }
          nestTags(parents, tagArr[0][i], last);
          parents = parents.children.find(item => {
            return (item.name === tagArr[0][i] && item.size === undefined);
          })
        }
        return theData;
      }

      // Create tag lineage
      function nestTags(parent, child, last){
        let childObject = {
          "name": child,
          "children": []
        }
        if(last) {
          if(parent.children.filter(item =>{
            return (item.name === child && item.children.length === 0);
          }).length > 0 ){
            parent.children.forEach(item => {
            if(item.name === child && item.children.length === 0){
              item.size += 1;
            } 
          })
        } else {
            childObject.size = 1;
            parent.children.push(childObject);
          }
        } else {
          parent.children.push(childObject);
        }
      }
      this.winData = winData;
      this.lossData = lossData;
    }

    let data = {
      "name": "Wins/Losses",
      "children": []
    }

    if(this.props.profile){
      data.children.push(this.lossData,this.winData)
      console.log('STATS PROPS', this.props)
      
      function clearData(){
        function NodeCheck(node, parent){
          console.log("NODE", node, node.size, node.children.length);
          if(node.size === undefined && node.children.length === 0 && node.name !== "Untagged"){
            // es-lint-disable-next-line
            parent.children = parent.children.filter(items => {
              return items !== node;
            })
          }
          if(node){
            for (let i = 0 ; i < node.children.length ; i++){
              NodeCheck(node.children[i], node);
            }           
          }
        }
        NodeCheck(data);
      }
      clearData();
      console.log("THE DATA ", data);
    }
    
    var width = 300;
    var height = 300;
    var radius = Math.min(width, height) / 2;
    // var color = d3.scaleOrdinal(d3.schemeCategory20b);
    var colors = {
      "Wins": "rgb(42, 158, 75)",
      "Losses": "rgb(204, 76, 44)",
      "Untagged": "#a3a3af",
      "fundamentals": "#6088e0",
      "testy": "#437759",
      "tester":  "#efc332"
    }
    this.setState({colors: colors});
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
              return colors[d.data.name]
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
            return (colors[d.data.name]);
          } else {
            return colors[d.data.name];
          }
        } else {
          return colors[d.data.name];
        }
      });
    // g.selectAll()
    // g.selectAll(".node")
    // .append("text")
    // .attr("transform", function(d) {
    //     return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")"; })
    // .attr("dx", "-20") // radius margin
    // .attr("dy", ".5em") // rotation align
    // .text(function(d) { return d.parent ? d.data.name : "" });
    console.log(this.colors)
  }

  render(){
      return (
        <div style={{display: "flex"}}>
          <svg></svg>
          {this.state.colors ? 
          (<ul className="legend">{Object.entries(this.state.colors).map(items => {
            return <p className="btn" style={{background : this.state.colors[items[0]]}}>{items[0]}</p>
          })}
          </ul>)
          :
          <p>awfsfdsf</p>}
        </div>
      )
  }
};

export default Stats;