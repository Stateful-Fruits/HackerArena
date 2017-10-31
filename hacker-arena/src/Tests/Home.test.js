import nightmare from 'nightmare';

describe('When visiting the homejpage', () => {
  let page = nightmare().goto('http://localhost:3000');

  test('Root renders', async () => {
    let rootNodeExists = await page.exists('#root');
    return expect(rootNodeExists).toBe(true);
  }, 10000);

  test('App renders', async () => {
    let appNodeExists = await page.exists('.App');
    return expect(appNodeExists).toBe(true);
  }, 10000);
  
  test('Login prompted', async () => {
    let loginPrompted = await page.exists('#Login').end();
    return expect(loginPrompted).toBe(true);
  }, 10000);
});