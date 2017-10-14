import React from 'react';
import fire from '../../Firebase/firebase';
import GameRoom from '../../Containers/GameRoom.js'
const UserButton  = ({username}) =>{
    return(
    <div>  {username}</div>)

}
export default UserButton;
   // fire.auth().currentUserclass 