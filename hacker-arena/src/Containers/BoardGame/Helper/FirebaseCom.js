import fire from '../../../Firebase/firebase';

const updateFireRoom = (room) => {
  fire.database().ref(`BoardRooms/${room.key}`).set(room);
}

const fireSet = {
  updateFireRoom
}

export default fireSet;