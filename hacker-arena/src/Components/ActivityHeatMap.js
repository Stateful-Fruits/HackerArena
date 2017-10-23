import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import $ from 'jquery';
import ReactTooltip from 'react-tooltip';
import '../Styles/ActivityHeatMap.css';

const ActivityHeatMap = (props) => {  
  // create array with objects {date : date, count: count}
  // SIMON REFACTOR THIS LATER
  let date = [];
  if(props.profile.history){
    // Strings of dates in 'YYYY-MM-DD' format
    let userStats = Object.values(props.profile.history).map(items =>{
      return JSON.stringify(new Date(items[0].timeStamp)).slice(1,11);
    })
    // Creating an array of objects from strings, incrementing count if the specific object[key] value exists
    for(let i  = 0 ; i < userStats.length ; i ++){
      if(Object.values(date).filter(items=>{
        return items.date !== userStats[i];
    }).length === Object.values(date).length){
          date.push({date:userStats[i], count:1});
        } else {
          for(var key in date){
            if(Object.values(date)[key].date === userStats[i]){
              date[key].count ++
            }
          }
        }
    }
  }
  
  // Creating title label for each individual day
  function customTitleForValue(value) {
    return value ? `${value.count} games played on ${value.date}` : null;
  }
  
  // Tooltip description for each day - Play Count + Date 
  const customTooltipDataAttrs = (value) => ({'data-tip': `${value.count} games played on ${value.date}`});
  
  return (
    <div>
      <CalendarHeatmap
        startDate={new Date('2016-12-31')}
        gutterSize={1}
        titleForValue ={customTitleForValue}
        values={date}
        tooltipDataAttrs={customTooltipDataAttrs}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          } else if (value.count > 4){
            return 'color-scale-4';
          }
          return `color-scale-${value.count}`;
        }}
      />
      <ReactTooltip place="top" type="dark" effect="float"/>
    </div>
)};

export default ActivityHeatMap;