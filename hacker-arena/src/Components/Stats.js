import React from 'react';
import '../Styles/Stats.css';
import * as d3 from 'd3';
import $ from 'jquery';

class Stats extends React.Component { 
  constructor(props){
    super(props);
    this.state = {

    }
  }
  componentDidMount(){
    let losses, wins, lossesByTags, winsByTags = [];
    // FIND LOSSES AND WINS BY TAGS
    
    if(this.props.profile){
      // Games where user is winner
      wins = Object.values(this.props.profile.history).filter(game => {
        return (Object.values(game[0].winners).indexOf(this.props.profile.username) > -1);
      })

      // Tags of games where user is WINNER
      winsByTags = wins.map(item => {
        return [item[0].problem.tags.replace(/ /g, "").split(',')];
      })
      
      // Games where user is LOSER
      losses = Object.values(this.props.profile.history).filter(game => {
        return (Object.values(game[0].winners).indexOf(this.props.profile.username) === -1);
      })
      // Tags of games where user is LOSER
      lossesByTags = losses.map(item => {
        return [item[0].problem.tags.replace(/ /g, "").split(',')];
      })
      
      //WIN DATA template
      let winData = {
        "name": "Wins",
        "children": [
        ]
      }
      // LOSS DATA template
      let lossData = {
        "name": "Losses",
        "children": [
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

      // Handles logic for pushing tags into data
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
    // Create Data object and push in WIN/LOSS data;
    let data = {
      "name": "Wins/Losses",
      "children": []
    }
    if(this.props.profile){
      data.children.push(this.lossData,this.winData)
    }
    // Creating sunburst graph
    var width = 300;
    var height = 300;
    var radius = Math.min(width, height) / 2;
    var colors = {
      "Wins": "rgb(42, 158, 75)",
      "Losses": "rgb(204, 76, 44)",
      "Untagged": "#a3a3af",
      "Fundamentals": "#6088e0",
      "Math": "#f48c42",
      "Algorithms": "#437759",
      "Numbers":  "#efc332",
      "Strings": "#1fcff2"
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

    g.selectAll('path')
        .data(root.descendants())
        .enter().append('path')
        .attr("display", function (d) { return d.depth ? null : "none"; })
        .attr("d", arc)
        .style('stroke', '#fff')
        .style("fill", function (d) { 
            return colors[d.data.name];
        })

    g.selectAll('g')
      .data(root.descendants())
      .enter().append('g').attr("class", "node").append('path')
      .attr("display", function (d) { return d.depth ? null : "none"; })
      .attr("d", arc)
      .style('stroke', '#fff')
      .style("fill", function (d) { 
          return colors[d.data.name];
      })
      .on('mouseover', handleMouseOver)
      .on('mouseleave', handleMouseLeave)
      function getAncestors(node) {
        var path = [];
        var current = node;
        while (current.parent) {
          path.unshift(current);
          current = current.parent;
        }
        return path;
      }
    function handleMouseOver(d){
      let totalSize = d3.selectAll('path').node().__data__.value;
      let percentage = ((d.value / totalSize) * 100).toFixed(2) + '%';
      d3.selectAll("path")
      .style("opacity", 0.3);
      let sequenceArray = getAncestors(d)
  // Then highlight only those that are an ancestor of the current segment.
      g.selectAll("path")
      .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
              })
      .style("opacity", 1)
      .style("filter", "dropShadow('10px 10p 10px black')")
      let tagsString = sequenceArray.map((item) => {
        return (item.data.name);
      })
      $('.percentage').append(`<p><strong>${percentage}</strong> of games </p>`)
      $('.pathSelection').append(`<p name=${d.name}><strong>${d.value}</strong> games with tags: ${tagsString.join(', ')} </p>`);
      $('.legend > p').css({"opacity": 0.3})
      sequenceArray.forEach((item) =>{
        $('.legend').find(`p[name=${item.data.name}]`).css({"opacity": 1});
      })
    }
    function handleMouseLeave(d){
      d3.selectAll("path")
      .style("opacity", 1);
      $('.percentage').find('p').remove();
      $('.legend > p').css({"opacity": 1});
      $('.pathSelection').find(`p[name=${d.name}]`).remove();
    }
  }

  render(){
      return (
        <div className="statsDiv">
          <h3 className="statsHeader">Statistics</h3>
        <div style={{display: "flex", flexDirection: "column"}}>
        <div style={{display: "flex", justifyContent: "space-around"}}>
            <svg></svg>
          
          {this.state.colors ? 
          (
            <div>
          <p className="btn legendHeader"> LEGEND </p> 
          <ul className="legend">
          {Object.entries(this.state.colors).map((items,i) => {
            return <p className="btn" key= {i} name={items[0]} style={{background : this.state.colors[items[0]]}}>{items[0]}</p>
          })}
          </ul>
          </div>
          )
          :
          <p>awfsfdsf</p>}
        </div>
        <div style={{display: "flex", justifyContent:"center"}}>
        <div className="sunburst" style={{position: "absolute"}}>
            <div className="percentage"></div>
            <div className="pathSelection" ></div>
          </div>
        </div>
        </div>
        </div>
      )
  }
};

export default Stats;