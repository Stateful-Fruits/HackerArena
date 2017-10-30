import helper from '../Containers/BoardGame/Helpers/helper';

// beforeEach(() => {
//   initializeCityDatabase();
// });

// afterEach(() => {
//   clearCityDatabase();
// });

describe ('setting block id and classes', () => {
  let className = 'some class name', i = 1;
  test('dark brown tiles on same divisibility by 2 as row', () => {
    expect(helper.setBrownName(className, i, {i:1})).toBe('some class name dbrown');
  });
  test('lgiht brown tile on diff divisibility by 2 as row', () => {
    expect(helper.setBrownName(className, i, {i:2})).toBe('some class name brown');
  });
})