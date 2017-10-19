import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import '../Styles/ActivityHeatMap.css';
const ActivityHeatMap = (props) => {  
  //let userStats = props.profile.user.stats
  return (
  <div>
    <CalendarHeatmap
  startDate={new Date('2016-12-31')}
  gutterSize={1}
  values={[
    { date: '2017-01-01', count: 1 },
    { date: '2017-01-03', count: 4 },
    { date: '2017-01-06', count: 2 },
    { date: '2017-10-06', count: 2 },
    { date: '2017-10-08', count: 3 },
    { date: '2017-10-10', count: 4 },
  ]}
  classForValue={(value) => {
    if (!value) {
      return 'color-empty';
    }
    return `color-scale-${value.count}`;
  }}
/>
  </div>
)};

export default ActivityHeatMap;