import fire from '../../../Firebase/firebase';

const updateFireRoom = (room) => {
  fire.database().ref(`BoardRooms/${room.key}`).set(room);
}
const removeOldPosition = (room, player) => {
  let otherPos = room.playerInfo[player].position;
  let currentPlace = room.board[otherPos[0]][otherPos[1]];
  currentPlace[0] = currentPlace[0].filter(n => n !== player);
}
const newPosition = (room, player) => {
  let otherPos = room.playerInfo[player].position;
  room.board[otherPos[0]][otherPos[1]][0].push(player);
}

const magnet = (user, room, others) => {  //reseting codeeditor
  let userInfo = room.playerInfo[user];
  let original = userInfo.position;
  others.forEach(player => {
    var playerInfo = room.playerInfo[player];
    var otherPos = playerInfo.position;
    removeOldPosition(room, player);
    var diff1 = Math.abs(original[0] - otherPos[0]);
    var diff2 = Math.abs(original[1] - otherPos[1]);
    var hypotenus = Math.ceil(Math.pow((Math.pow(diff1, 2) + Math.pow(diff2, 2)),0.5));
    otherPos[0] = original[0];
    hypotenus -= diff1;
    if (original[1] > otherPos[1]) {
      otherPos[1] += hypotenus;
    } else if (original[1] < otherPos[1]) {
      otherPos[1] -= hypotenus;
    }
    newPosition(room, player);
  })
  updateFireRoom(room);
}

const sword = (user, room, others) => {
  let userInfo = room.playerInfo[user];
  let original = userInfo.position;
  let origx = original[1];
  let origy = original[0];
  others.forEach(player => {
    let playerInfo = room.playerInfo[player];
    let otherPos = playerInfo.position;
    let x = otherPos[1];
    let y = otherPos[0];
    if ((x+1 === origx && Math.abs(y-origy) < 2) ||
      (x-1 === origx && Math.abs(y-origy) < 2) ||
      (y+1 === origy && Math.abs(x-origx) < 2) ||
      (y-1 === origy && Math.abs(x-origx) < 2)) {
      removeOldPosition(room, player);
      playerInfo.position = [0,0];
      newPosition(room, player);
    }
  })
  updateFireRoom(room);
}

const gun = (user, room, others) => {
  let userInfo = room.playerInfo[user];
  let original = userInfo.position;
  let origx = original[1];
  let origy = original[0];
  others.forEach(player => {
    let playerInfo = room.playerInfo[player];
    let otherPos = playerInfo.position;
    let x = otherPos[1];
    let y = otherPos[0];
    if ((y-2 === origy && Math.abs(x-origx) < 3) ||
    (y+2 === origy && Math.abs(x-origx) < 3) ||
    (x-2 === origy && Math.abs(y-origy) < 3) ||
    (x+2 === origy && Math.abs(y-origy) < 3)) {
      removeOldPosition(room, player);
      playerInfo.position = [0,0];
      newPosition(room, player);
    }
  })
  updateFireRoom(room);
}

const shield = (user, room) => {
  room.playerInfo[user].status = 'shielded';
  updateFireRoom(room);
}

const boost = (user, room) => {
  room.playerInfo[user].diceResult = Math.ceil(room.playerInfo[user].diceResult * 1.5);
  updateFireRoom(room);
}

export default {
  magnet,
  sword,
  gun,
  shield,
  boost
}