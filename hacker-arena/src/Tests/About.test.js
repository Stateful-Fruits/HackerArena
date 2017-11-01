import nightmare from 'nightmare';

describe('The About Button being clicked', ()=> {
    let page = nightmare().goto('http://localhost:3000')
    .type('#Login > div > form > div.form-input > input', 'test123@gmail.com')
    .type('#Login > div > form > div:nth-child(3) > input', 'test123')
    .click('#Login > div > form > div:nth-child(5) > button').wait(1000)
    .click('nav>ul>li:nth-child(2)').wait(1000).screenshot('./src/Tests/test.png')
        
test('has Video tag',async() => {
    let rootNodeExists = await page.exists('div>video').end();
    return expect(rootNodeExists).toBe(true);
    
},90000);
});
 
describe('The About Button being clicked', ()=> {
    let page = nightmare().goto('http://localhost:3000')
    .type('#Login > div > form > div.form-input > input', 'test123@gmail.com')
    .type('#Login > div > form > div:nth-child(3) > input', 'test123')
    .click('#Login > div > form > div:nth-child(5) > button').wait(1000)
    .click('nav>ul>li:nth-child(2)').wait(1000).screenshot('./src/Tests/test.png')
     
test('user should be able to see the about page', async ()=> {
    let Hero = await page.exists('div.teamCard').end();
    return expect(Hero).toBe(true) ;
},9000);
});