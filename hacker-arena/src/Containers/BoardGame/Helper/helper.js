import fire from '../../../Firebase/firebase';
const helper = {};

helper.prepInfo = () => {

}

helper.setBrownName = (className, i, props) => {
  if (i%2 === props.i%2) {
    return className + ' dbrown';
  } else {
    return className + ' brown';
  }
}
 
helper.setBlockPositionName = (i, props) => {
  if (!props.lastrow) {
    if (i === props.row.length-1) {
      return helper.setBrownName('bdblock lastblock',i,props);
    } else {
      return helper.setBrownName('bdblock',i,props);
    }
  } else {
    if (i === props.row.length-1) {
      return helper.setBrownName('bdblock lastrowblock',i,props);
    } else {
      return helper.setBrownName('bdblock lastrow',i,props);
    }
  }
}

helper.setWhirlPools = (size) => {
  let whirlpools = [];
  let arr1 = [];
  let useThisSize = size-1;
  while (useThisSize > -1) {
    arr1.push(useThisSize);
    useThisSize--;
  }
  let arr2 = arr1.slice();
  let random, random1;
  let totalWP = size - 2;
  while (whirlpools.length < totalWP) {
    random = Math.floor(arr1.length * Math.random());
    random1 = Math.floor(arr2.length * Math.random());
    let positionString = random + ' ' + random1;
    if (!(random === 0 && random1 === 0) && !(random === 6 && random1 === 6) && whirlpools.indexOf(positionString) === -1) {
      whirlpools.push(random + ' ' + random1);
      arr1.splice(random,1);
      arr2.splice(random1,1);
    }
  }
  return whirlpools
}

helper.handleBoard = (room) => {
  let winner, players = room.players, history, whirled;
  let {whirlpools, playerInfo, board} = room;
  players.forEach(player => {
    let position = room.playerInfo[player].position;
    let positionString = position[0] + ' ' + position[1];
    if (whirlpools.indexOf(positionString) !== -1) {
      whirled = true;
      let random = Math.floor(Math.random() * 7);
      let random1 = Math.floor(Math.random() * 7);
      board[position[0]][position[1]][0] = board[position[0]][position[1]][0].filter(ele => ele !== player);
      playerInfo[player].position = [random,random1];
      board[random][random1][0].push(player);
    }
    if (position[0] === 6 && position[1] === 6) {
      winner = player;
      let playerObj = {};
      players.forEach(player1 => {
        playerObj[player1] = 'CodeRunner';
      });
      let problem = room.board[6][6][1];
      history = [{
        players: playerObj,
        problem,
        timeStamp: new Date(),
        timeTaken: new Date(),
        winners: {hacker: player}
      }];
      return;
    }
  })
  if (whirled) {
    fire.database().ref(`BoardRooms/${room.key}`).set(room);
  }
  if (winner) {
    players.forEach(player => {
      fire.database().ref(`users/${player}/history/${room.key}`).set(history);
    });
  }
}

export default helper;