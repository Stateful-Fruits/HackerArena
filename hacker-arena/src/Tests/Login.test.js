import nightmare from 'nightmare';

describe('When on the login screen', () => {
  let page = nightmare().goto('http://localhost:3000')
      .type('#Login > div > form > div.form-input > input', 'test123@gmail.com')
      .type('#Login > div > form > div:nth-child(3) > input', 'test123')
      .click('#Login > div > form > div:nth-child(5) > button').wait(1000);

  test('user can login and be redirected to homepage', async () => {
    let gameRoomListShows = await page.exists('#GameRoomList').end();
    return expect(gameRoomListShows).toBe(true);
  }, 20000);
});