import nightmare from 'nightmare';

describe('When on lobby screen (game room list)', () => {
  let page;
  
  beforeEach(() => {
    page = nightmare().goto('http://localhost:3000')
      .type('#Login > div > form > div.form-input > input', 'test123@gmail.com')
      .type('#Login > div > form > div:nth-child(3) > input', 'test123')
      .click('#Login > div > form > div:nth-child(5) > button').wait(1000);
  });

  test('user can create a room by pushing the create room button', async () => {
    let gameRoomListShows = await page.exists('.createGameButton').end();
    return expect(gameRoomListShows).toBe(true);
  }, 10000);
});