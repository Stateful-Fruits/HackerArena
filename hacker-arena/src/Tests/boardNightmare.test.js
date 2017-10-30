const $ = require('jquery');
const Nightmare = require('nightmare');
const nightmare = Nightmare();

describe ('should log in correctly', async () => {
  let url = await nightmare
  .goto('https://localhost:3000/CodeRunLobby')
  .click('.createBoardroom')
  .url();
  
  test('should redirect on creating room', () => {
    expect(url).not.toBe('https://localhost:3000/CodeRunLobby');
  })

})