// import fire from '../firebase';
import db from '../db'

import problems from './problems';
// import users from './users';
// import rooms from './rooms';

const populateDb = function() {
  insertProblems();
  //insertUsers();
  //insertRooms();
}

const insertProblems = function() {
  problems.map(problem => {
    problem.tests = problem.tests.map(test => test.replace(problem.userFn, 'userFn'));
    return problem;
  })
  .forEach(problem => db.Problems.push(problem));
}

// const insertUsers = function() {
//   users.forEach(user => db.Users.push(user));
// }

// const insertRooms = function() {
//   rooms.forEach(room => db.Rooms.push(room))
// }

export default populateDb;