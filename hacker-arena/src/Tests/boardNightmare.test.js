// import nightmare from 'nightmare';
const nightmare = require('nightmare');
const $ = require('jquery');
const folder = `./src/Tests/boardGameSS/`;

describe ('Board Game navigation should be fine', async () => {
  let page = nightmare().goto('http://localhost:3000')
  .type('#Login > div > form > div.form-input > input', 'coke@gmail.com')
  .type('#Login > div > form > div:nth-child(3) > input', 'testtest')
  .click('#Login > div > form > div:nth-child(5) > button').wait(1000);
  
  test('coderunlobby should exists', async () => {
    let exist = await page.click('.codeRunLobby')
    .exists('.createBoardroom');//exists('.createBoardroom').end();
    expect(exist).toBe(true);
  },10000)
  test('should redirect on creating room', async () => {
    let url = await page.click('.codeRunLobby')
    .click('.createBoardroom')
    .url();
    expect(url).not.toBe('https://localhost:3000/CodeRunLobby');
  },100000)
  test('should have board on start game', async () => {
    let boardExist = await page.wait(1000)
    //.screenshot(folder + `onButton.png`)
    .click('.btn.createGameButton')
    .wait(1000)
    //.screenshot(folder + `gameStarted.png`)
    .exists('.board');
    expect(boardExist).toBe(true);
  },10000)
  test('should have deep brown tiles, brown tiles, dice, button for moves etc', async () => {
    let dbrownTiles = await page.exists('.dbrown');
    expect(dbrownTiles).toBe(true);
  },10000)
  test('should have brown tiles', async () => {
    let brownTiles = await page.exists('.brown');
    expect(brownTiles).toBe(true);
  })
  test('should have dice', async () => {
    let dice = await page.exists('.dice');
    expect(dice).toBe(true);
  })
  test('should have button', async () => {
    let button = await page.exists('#root > div > div > div > div.diceContainer > div:nth-child(2) > button');
    expect(button).toBe(true);
  },10000)
  test('should close game on leave component', async () => {
    let inner = await page.click(`#root > div > nav > ul > li:nth-child(3)`)
    .wait(1000)
    //.screenshot(folder + 'noGames.png')
    .evaluate(() => {
      let ele = document.querySelector(`#root > div > div > div > div:nth-child(3) > div > ul > li > h4 > span`);
      if (ele) {
        return ele.innerHTML.indexOf('coke') === -1;
      } return true;
    });
    expect(inner).toBe(true);
  },10000)
  test('should log out', async () => {
    let url = await page.click(`#root > div > nav > ul > li:nth-child(7)`)
    //.screenshot(folder+'end.png')
    .url();
    expect(url).toBe(`http://localhost:3000/Login`);
  },10000)
})