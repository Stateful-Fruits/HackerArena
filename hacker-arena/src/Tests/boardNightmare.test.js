// import nightmare from 'nightmare';
const nightmare = require('nightmare');
const $ = require('jquery');


describe ('should log in correctly', () => {
  let page;
  beforeEach(() => {
    page = nightmare().goto('http://localhost:3000')
      .type('#Login > div > form > div.form-input > input', 'test123@gmail.com')
      .type('#Login > div > form > div:nth-child(3) > input', 'test123')
      .click('#Login > div > form > div:nth-child(5) > button').wait(1000);
  });
  
  test('coderunlobby should exists', async () => {
    let exist = await page.click('.codeRunLobby')
    .exists('.createBoardroom')
    .end();//exists('.createBoardroom').end();
    expect(exist).toBe(true);
  },10000)
  test('should redirect on creating room', async () => {
    let url = await page.click('.codeRunLobby')
    .click('.createBoardroom')
    .url();
    expect(url).not.toBe('https://localhost:3000/CodeRunLobby');
  },10000)
})