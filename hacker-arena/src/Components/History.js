import React from 'react';
import HistoryEntry from './HistoryEntry';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import '../Styles/History.css';

class History extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    let { navigate } = this.props
    let games = Object.values(this.props.profile.history);
    return (
      <div className="history">
        <h3 className="historyHeader">History </h3>
        {games.reverse().map((item,i) => {
           return <HistoryEntry navigate={navigate} game={item} profile={this.props.profile} key={i}/>
        })}
      </div>
  )
  }  
};

const mapStateToProps = (state) => ({
});


const mapDispatchToProps = (dispatch) => ({
  navigate: (route) => dispatch(push(route)),
}); 

export default connect(mapStateToProps, mapDispatchToProps)(History);