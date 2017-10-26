import db from './db.js';

const syncToDb = function(updateGameRooms, updateProblems, updateBoardRooms) {
  db.Rooms.once('value', data => {
    // dispatch action to change game rooms array in store
    updateGameRooms(data.val());
  });
  // grab and listen for game rooms from firebase db
  db.Rooms.on('value', data => {
    // dispatch action to change game rooms array in store
    updateGameRooms(data.val());
  });
  
  db.Problems.on('value', data => {
    console.log('problems filing into state');
    updateProblems(data.val());  
  });
  
  db.BoardRooms.on('value', data => {
    updateBoardRooms(data.val());
  });
}

export default syncToDb;

