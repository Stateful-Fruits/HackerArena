import nightmare from 'nightmare';

describe('When on the lobby screen (game room list)', () => {
  let page = nightmare().goto('http://localhost:3000')
      .type('#root > div > div > div > div.hero > div > div > form > div:nth-child(2) > input:nth-child(2)', 'test123@gmail.com')
      .type('#root > div > div > div > div.hero > div > div > form > div:nth-child(2) > input:nth-child(4)', 'test123')
      .click('#root > div > div > div > div.hero > div > div > form > div:nth-child(4) > button')
      .click('#root > div > nav > ul > li:nth-child(3)').wait(1000).click('#root > div > nav > ul > li:nth-child(3)');

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

  test('user should see their account page in the upper right', async () => {
    let canSeeUserPannel = await page.wait(1000).exists('.profile-image');
    return expect(canSeeUserPannel).toBe(true);
  }, 20000);

  test('user can click the create room button, and be navigated to create game room', async () => {
    let navigatedToCreateGameRoom = await page.click('.createGameButton')
                                              .exists('.submitCreateGame').end();
    return expect(navigatedToCreateGameRoom).toBe(true);
  }, 20000);
});