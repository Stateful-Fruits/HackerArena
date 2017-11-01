import nightmare from 'nightmare';

describe('When on the login screen', () => {
  let page = nightmare().goto('http://localhost:3000')
                        .type('#root > div > div > div > div.hero > div > div > form > div:nth-child(2) > input:nth-child(2)', 'test123@gmail.com')
                        .type('#root > div > div > div > div.hero > div > div > form > div:nth-child(2) > input:nth-child(4)', 'test123')
                        .click('#root > div > div > div > div.hero > div > div > form > div:nth-child(4) > button')
                        .click('#root > div > nav > ul > li:nth-child(3)')
                        .wait(1000).click('#root > div > nav > ul > li:nth-child(3)').screenshot('./src/Tests/test.png');

  test('user can login and access the homepage', async () => {
    let gameRoomListShows = await page.exists('#GameRoomList').end();
    return expect(gameRoomListShows).toBe(true);
  }, 20000);
});