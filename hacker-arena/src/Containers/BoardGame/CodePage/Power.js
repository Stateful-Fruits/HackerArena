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

const magnet = (user, room) => {
  let players = room.players;
  let userInfo = room.playerInfo[user];
  let original = userInfo.position;
  players.forEach(player => {
    if (player !== user) {
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
      playerInfo.position = otherPos;
    }
  })
  console.log('rooooom', room);
  updateFireRoom(room);
}

const sword = (user, room) => {
  let userInfo = room.playerInfo[user];
  let original = userInfo.position;
  let origx = original[1];
  let origy = original[0];
  room.players.forEach(player => {
    if (player !== user) {
      let playerInfo = room.playerInfo[player];
      let otherPos = playerInfo.position;
      let x = otherPos[1];
      let y = otherPos[0];
      if (x+1 === origx || x-1 === origx || y+1 === origy || y-1 === origy) {
        removeOldPosition(room, player);
        playerInfo.position = [0,0];
        newPosition(room, player);
      }
    }
  })
  updateFireRoom(room);
}

const gun = (user, room) => {
  let userInfo = room.playerInfo[user];
  let original = userInfo.position;
  let origx = original[1];
  let origy = original[0];
  room.players.forEach(player => {
    if (player !== user) {
      let playerInfo = room.playerInfo[player];
      let otherPos = playerInfo.position;
      let x = otherPos[1];
      let y = otherPos[0];
      if (x+2 === origx || x-2 === origx || y+2 === origy || y-2 === origy) {
        removeOldPosition(room, player);
        playerInfo.position = [0,0];
        newPosition(room, player);
      }
    }
  })
  updateFireRoom(room);
}

export default {
  magnet,
  sword,
  gun
}