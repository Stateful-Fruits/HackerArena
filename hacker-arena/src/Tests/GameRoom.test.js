import nightmare from 'nightmare';

describe('When on the lobby screen (game room list)', () => {
  let page = nightmare().goto('http://localhost:3000')
      .type('#Login > div > form > div.form-input > input', 'test123@gmail.com')
      .type('#Login > div > form > div:nth-child(3) > input', 'test123')
      .click('#Login > div > form > div:nth-child(5) > button').wait(500);

  test('User can search the game rooms for usernames', async () => {
    let filterTextInput = await page.exists('.searchBar');
    return expect(filterTextInput).toBe(true);
  }, 20000);

  test('User can filter the game room list', async () => {
    let sortSelectMenu = await page.exists('.filterBar');
    let sortByOption1 = await page.exists('#GameRoomList > div.searchAndFilter > div.input-group.filterGameSearch > select > option:nth-child(1)');
    let sortByOption2 = await page.exists('#GameRoomList > div.searchAndFilter > div.input-group.filterGameSearch > select > option:nth-child(2)');
    let sortByOption3 = await page.exists('#GameRoomList > div.searchAndFilter > div.input-group.filterGameSearch > select > option:nth-child(3)');
    let childrenExist = sortByOption1 && sortByOption2 && sortByOption3;
    let sortSelectMenuAndChildren = sortSelectMenu && childrenExist;
    expect(sortSelectMenuAndChildren).toBe(true);
  }, 20000);

  test('user can see the list of open gamerooms', async () => {
    let gameRoomListShows = await page.exists('#GameRoomList');
    return expect(gameRoomListShows).toBe(true);
  }, 20000);


  test('user can see the create room button', async () => {
    let createRoomButtonExists = await page.exists('.createGameButton');
    return expect(createRoomButtonExists).toBe(true);
  }, 20000);

  test('user can click the create room button, and be navigated to create game room', async () => {
    let navigatedToCreateGameRoom = await page.click('.createGameButton').exists('.submitCreateGame');
    return expect(navigatedToCreateGameRoom).toBe(true);
  }, 20000);
  
  test('user can navigate back to home page with gameroom list', async () => {
    let navigateBackToHome = await page
                                  .click('#root > div > nav > ul > li:nth-child(1)')
                                  .screenshot('./src/Tests/test.png')
                                  .exists('#GameRoomList')
                                  .end();
    return expect(navigateBackToHome).toBe(true);
  }, 20000);
});