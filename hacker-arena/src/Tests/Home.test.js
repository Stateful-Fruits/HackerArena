import nightmare from 'nightmare';

describe('When visiting the homejpage', () => {
  test('Root renders', async () => {
    let page = nightmare().goto('http://localhost:3000');
    let rootNodeExists = await page.exists('#root').end();
    return expect(rootNodeExists).toBe(true);
  });
  test('App renders', async () => {
    let page = nightmare().goto('http://localhost:3000');
    let appNodeExists = await page.exists('.App');
    return expect(appNodeExists).toBe(true);
  });
  test('Login prompted', async () => {
    let page = nightmare().goto('http://localhost:3000');
    let loginPrompted = await page.exists('#Login').end();
    return expect(loginPrompted).toBe(true);
  });
});