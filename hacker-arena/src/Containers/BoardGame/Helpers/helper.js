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

helper.setWhirlPools = (size, room) => {
  let whirlpools = [];
  let random, random1;
  let totalWP = size - 2;
  while (whirlpools.length < totalWP) {
    random = Math.floor(7 * Math.random());
    random1 = Math.floor(7 * Math.random());
    let positionString = random + ' ' + random1;
    if (!(random === 0 && random1 === 0) && !(random === 6 && random1 === 6) && whirlpools.indexOf(positionString) === -1) {
      whirlpools.push(random + ' ' + random1);
    }
  }
  return whirlpools;
}

helper.handleBoard = (room, user) => {
  let winner, players = room.players, history;//, whirled, metGoblin;
  // let {whirlpools, playerInfo, board} = room;
  players.forEach(player => {
    let position = room.playerInfo[player].position;
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
  if (winner) {
    players.forEach(player => {
      fire.database().ref(`users/${player}/history/${room.key}`).set(history);
    });
  }
  let gobPos = room.Goblin.position;
  let gobString = gobPos[0] + ' ' + gobPos[1];
  let metGoblin = [];
  players.forEach(player => {
    let position = room.playerInfo[player].position;
    let positionString = position[0] + ' ' + position[1];
    if (gobString === positionString) {
      metGoblin.push(player);
      // board[position[0]][position[1]][0] = board[position[0]][position[1]][0].filter(ele => ele !== player);
      // playerInfo[player].position = [0,0];
      // board[0][0][0].push(player);
    }
  });
  if (metGoblin.length) {
    fire.database().ref(`BoardRooms/${room.key}`).transaction(room => {
      let gobPos = room.Goblin.position;
      let gobString = gobPos[0] + ' ' + gobPos[1];
      room.players.forEach(player => {
        let position = room.playerInfo[player].position;
        let positionString = position[0] + ' ' + position[1];
        if (gobString === positionString) {
          room.board[position[0]][position[1]][0] = room.board[position[0]][position[1]][0].filter(ele => ele !== player);
          room.playerInfo[player].position = [0,0];
          room.board[0][0][0].push(player);
        }
      });
      return room;
    })
  }
  let diceResult = room.playerInfo[user].diceResult;
  if (diceResult < 0 || (diceResult === 0 && room.playerInfo[user].canMove)) {
    fire.database().ref(`BoardRooms/${room.key}`).transaction(room => {
      room.playerInfo[user].diceResult = 0;
      room.playerInfo[user].canMove = false;
      return room;
    })
  }
/*
  let gobPos = room.Goblin.position;
  let gobString = gobPos[0] + ' ' + gobPos[1];
  players.forEach(player => {
    let position = room.playerInfo[player].position;
    let positionString = position[0] + ' ' + position[1];
    if (gobString === positionString) {
      metGoblin = true;
      board[position[0]][position[1]][0] = board[position[0]][position[1]][0].filter(ele => ele !== player);
      playerInfo[player].position = [0,0];
      board[0][0][0].push(player);
    } else if (whirlpools.indexOf(positionString) !== -1) {
      whirled = true;
      let invalid = true, random, random1;
      while (invalid) {
        random = Math.floor(Math.random() * 7);
        random1 = Math.floor(Math.random() * 7);
        if (whirlpools.indexOf(random + ' ' + random1) === -1){
          invalid = false;
        }
      }
      board[position[0]][position[1]][0] = board[position[0]][position[1]][0].filter(ele => ele !== player);
      playerInfo[player].position = [random,random1];
      board[random][random1][0].push(player);
    }
  })
  if (metGoblin || whirled) {
    //fire.database().ref(`BoardRooms/${room.key}`).set(room);
    fire.database().ref(`BoardRooms/${room.key}`).transaction(room => {
      let gobPos = room.Goblin.position;
      let gobString = gobPos[0] + ' ' + gobPos[1];
      players.forEach(player => {
        let position = room.playerInfo[player].position;
        let positionString = position[0] + ' ' + position[1];
        if (gobString === positionString) {
          metGoblin = true;
          board[position[0]][position[1]][0] = board[position[0]][position[1]][0].filter(ele => ele !== player);
          playerInfo[player].position = [0,0];
          board[0][0][0].push(player);
        } else if (whirlpools.indexOf(positionString) !== -1) {
          whirled = true;
          let invalid = true, random, random1;
          while (invalid) {
            random = Math.floor(Math.random() * 7);
            random1 = Math.floor(Math.random() * 7);
            if (whirlpools.indexOf(random + ' ' + random1) === -1){
              invalid = false;
            }
          }
          board[position[0]][position[1]][0] = board[position[0]][position[1]][0].filter(ele => ele !== player);
          playerInfo[player].position = [random,random1];
          board[random][random1][0].push(player);
        }
      })
      return room;
    })
  }
  */
}

helper.checkMetGoblinOrWhirlpool = (room, pos) => {
  let gobPos = room.Goblin.position;
  let gobString = gobPos[0] + ' ' + gobPos[1];
  let {whirlpools} = room;
  let position = pos;//room.playerInfo[player].position;
  let positionString = position[0] + ' ' + position[1];
  let condition = null;
  if (gobString === positionString) {
    condition = 'metGoblin';
    // board[position[0]][position[1]][0] = board[position[0]][position[1]][0].filter(ele => ele !== player);
    // playerInfo[player].position = [0,0];
    // board[0][0][0].push(player);
  } else if (whirlpools.indexOf(positionString) !== -1) {
    condition = 'whirled';
    // let invalid = true, random, random1;
    // while (invalid) {
    //   random = Math.floor(Math.random() * 7);
    //   random1 = Math.floor(Math.random() * 7);
    //   if (whirlpools.indexOf(random + ' ' + random1) === -1){
    //     invalid = false;
    //   }
    // }
    // board[position[0]][position[1]][0] = board[position[0]][position[1]][0].filter(ele => ele !== player);
    // playerInfo[player].position = [random,random1];
    // board[random][random1][0].push(player);
  }
  return condition;
}

helper.movePlayer = (direction, room, user) => {
  console.log('room key is ',room,room.key);
  let userInfo = room.playerInfo[user];
  let position = userInfo.position;
  let row = position[0];
  let col = position[1];
  if (direction === 'Up' && room.board[row - 1]) {
    //fire.database().ref('BoardRooms/' + room.key).set(room);
    fire.database().ref(`BoardRooms/${room.key}`).transaction(room => {
      let userInfo = room.playerInfo[user];
      let position = userInfo.position;
      let row = position[0];
      let col = position[1];
      room.board[row][col][0] = room.board[row][col][0].filter(player => player !== user);
      row -= 1;
      room.players.forEach(player => {
        let pushedguy = room.playerInfo[player].position;
        if (pushedguy[0] === row && pushedguy[1] === col && room.board[row-1][col]) {
          room.board[row][col][0] = room.board[row][col][0].filter(player1 => player1 !== player);
          room.board[row-1][col][0].push(player);
          room.playerInfo[player].position = [row-1,col];
        }
      })
      userInfo.position = [row,col];
      let condition = helper.checkMetGoblinOrWhirlpool(room, [row,col]);
      if (condition === null) {
        room.board[row][col][0].push(user);
      } else if (condition === 'metGoblin') {
        room.board[position[0]][position[1]][0] = room.board[position[0]][position[1]][0].filter(ele => ele !== user);
        userInfo.position = [0,0];
        room.board[0][0][0].push(user);
        // board[position[0]][position[1]][0] = board[position[0]][position[1]][0].filter(ele => ele !== player);
        // playerInfo[player].position = [0,0];
        // board[0][0][0].push(player);
      } else if (condition === 'whirled') {
        let whirlpools = room.whirlpools;
        let invalid = true, random, random1;
        while (invalid) {
          random = Math.floor(Math.random() * 7);
          random1 = Math.floor(Math.random() * 7);
          if (whirlpools.indexOf(random + ' ' + random1) === -1){
            invalid = false;
          }
        }
        room.board[position[0]][position[1]][0] = room.board[position[0]][position[1]][0].filter(ele => ele !== user);
        room.playerInfo[user].position = [random,random1];
        room.board[random][random1][0].push(user);
      }
      userInfo.diceResult--;
      if (userInfo.diceResult === 0) {
        userInfo.canMove = !userInfo.canMove;
      }
      return room;
    })
  } else if (direction === 'Down' && room.board[row+1]) {
    fire.database().ref(`BoardRooms/${room.key}`).transaction(room => {
      let userInfo = room.playerInfo[user];
      let position = userInfo.position;
      let row = position[0];
      let col = position[1];
      room.board[row][col][0] = room.board[row][col][0].filter(player => player !== user);
      row += 1;
      room.players.forEach(player => {
        let pushedguy = room.playerInfo[player].position;
        if (pushedguy[0] === row && pushedguy[1] === col && room.board[row+1][col]) {
          room.board[row][col][0] = room.board[row][col][0].filter(player1 => player1 !== player);
          room.board[row+1][col][0].push(player);
          room.playerInfo[player].position = [row+1,col];
        }
      })
      //room.board[row][col][0].push(user);
      userInfo.position = [row,col];
      let condition = helper.checkMetGoblinOrWhirlpool(room, [row,col]);
      if (condition === null) {
        room.board[row][col][0].push(user);
      } else if (condition === 'metGoblin') {
        room.board[position[0]][position[1]][0] = room.board[position[0]][position[1]][0].filter(ele => ele !== user);
        userInfo.position = [0,0];
        room.board[0][0][0].push(user);
        // board[position[0]][position[1]][0] = board[position[0]][position[1]][0].filter(ele => ele !== player);
        // playerInfo[player].position = [0,0];
        // board[0][0][0].push(player);
      } else if (condition === 'whirled') {
        let whirlpools = room.whirlpools;
        let invalid = true, random, random1;
        while (invalid) {
          random = Math.floor(Math.random() * 7);
          random1 = Math.floor(Math.random() * 7);
          if (whirlpools.indexOf(random + ' ' + random1) === -1){
            invalid = false;
          }
        }
        room.board[position[0]][position[1]][0] = room.board[position[0]][position[1]][0].filter(ele => ele !== user);
        room.playerInfo[user].position = [random,random1];
        room.board[random][random1][0].push(user);
      }
      userInfo.diceResult--;
      if (userInfo.diceResult === 0) {
        userInfo.canMove = !userInfo.canMove;
      }
      return room;
    });
    //fire.database().ref('BoardRooms/' + room.key).set(room);
  } else if (direction === 'Left' && room.board[row][col-1]) {
    fire.database().ref(`BoardRooms/${room.key}`).transaction(room => {
      let userInfo = room.playerInfo[user];
      let position = userInfo.position;
      let row = position[0];
      let col = position[1];
      room.board[row][col][0] = room.board[row][col][0].filter(player => player !== user);
      col -= 1;
      room.players.forEach(player => {
        let pushedguy = room.playerInfo[player].position;
        if (pushedguy[0] === row && pushedguy[1] === col && room.board[row][col-1]) {
          room.board[row][col][0] = room.board[row][col][0].filter(player1 => player1 !== player);
          room.board[row][col-1][0].push(player);
          room.playerInfo[player].position = [row,col-1];
        }
      })
      //room.board[row][col][0].push(user);
      userInfo.position = [row,col];
      let condition = helper.checkMetGoblinOrWhirlpool(room, [row,col]);
      if (condition === null) {
        room.board[row][col][0].push(user);
      } else if (condition === 'metGoblin') {
        room.board[position[0]][position[1]][0] = room.board[position[0]][position[1]][0].filter(ele => ele !== user);
        userInfo.position = [0,0];
        room.board[0][0][0].push(user);
        // board[position[0]][position[1]][0] = board[position[0]][position[1]][0].filter(ele => ele !== player);
        // playerInfo[player].position = [0,0];
        // board[0][0][0].push(player);
      } else if (condition === 'whirled') {
        let whirlpools = room.whirlpools;
        let invalid = true, random, random1;
        while (invalid) {
          random = Math.floor(Math.random() * 7);
          random1 = Math.floor(Math.random() * 7);
          if (whirlpools.indexOf(random + ' ' + random1) === -1){
            invalid = false;
          }
        }
        room.board[position[0]][position[1]][0] = room.board[position[0]][position[1]][0].filter(ele => ele !== user);
        room.playerInfo[user].position = [random,random1];
        room.board[random][random1][0].push(user);
      }
      userInfo.diceResult--;
      if (userInfo.diceResult === 0) {
        userInfo.canMove = !userInfo.canMove;
      }
      return room;
    });
    //fire.database().ref('BoardRooms/' + room.key).set(room);
  } else if (direction === 'Right' && room.board[row][col+1]) {
    fire.database().ref(`BoardRooms/${room.key}`).transaction(room => {
      console.log('room inside fire is',room);
      let userInfo = room.playerInfo[user];
      let position = userInfo.position;
      let row = position[0];
      let col = position[1];
      room.board[row][col][0] = room.board[row][col][0].filter(player => player !== user);
      col += 1;
      room.players.forEach(player => {
        let pushedguy = room.playerInfo[player].position;
        if (pushedguy[0] === row && pushedguy[1] === col && room.board[row][col+1]) {
          room.board[row][col][0] = room.board[row][col][0].filter(player1 => player1 !== player);
          room.board[row][col+1][0].push(player);
          room.playerInfo[player].position = [row,col+1];
        }
      })
      //room.board[row][col][0].push(user);
      userInfo.position = [row,col];
      let condition = helper.checkMetGoblinOrWhirlpool(room, [row,col]);
      if (condition === null) {
        room.board[row][col][0].push(user);
      } else if (condition === 'metGoblin') {
        room.board[position[0]][position[1]][0] = room.board[position[0]][position[1]][0].filter(ele => ele !== user);
        userInfo.position = [0,0];
        room.board[0][0][0].push(user);
        // board[position[0]][position[1]][0] = board[position[0]][position[1]][0].filter(ele => ele !== player);
        // playerInfo[player].position = [0,0];
        // board[0][0][0].push(player);
      } else if (condition === 'whirled') {
        let whirlpools = room.whirlpools;
        let invalid = true, random, random1;
        while (invalid) {
          random = Math.floor(Math.random() * 7);
          random1 = Math.floor(Math.random() * 7);
          if (whirlpools.indexOf(random + ' ' + random1) === -1){
            invalid = false;
          }
        }
        room.board[position[0]][position[1]][0] = room.board[position[0]][position[1]][0].filter(ele => ele !== user);
        room.playerInfo[user].position = [random,random1];
        room.board[random][random1][0].push(user);
      }
      userInfo.diceResult--;
      if (userInfo.diceResult === 0) {
        userInfo.canMove = !userInfo.canMove;
      }
      return room;
    });
    //fire.database().ref('BoardRooms/' + room.key).set(room);
  }
}

export default helper;