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
  }, 10000);
});

describe('After logging in', () => {
  let page = nightmare().goto('http://localhost:3000')
                        .type('#email', 'test123@gmail.com')
                        .type('#password', 'test123')
                        .click('.loginButton')
                        .wait(1000).screenshot('./src/Tests/test2.png')

  test('user should be able to see introduction', async () => {
    let introduction = await page.exists('.introduction');
    return expect(introduction).toBe(true);
  }, 10000);

  test('user should be able to see their profile picture', async ()=> {
    let profpic = await page.exists('.corner-profile-pic2');
    return expect(profpic).toBe(true);
  }, 10000)

  page = page.wait(20000)
              .click('#logout');

  test('user should no longer see their profile after logging in', async() => {
    let profpic = await page.exists('.corner-profile-pic2').end();
    return expect(profpic).toBe(true); 
  }, 10000)

});