import helper from '../Containers/BoardGame/Helpers/helper';

describe ('block naming by divisibility to 2', () => {
  let className = 'kaiChen test', i = 1;
  test('brown on different divisibility than first', () => {
    expect(helper.setBrownName(className, i, {i: 2})).toBe('kaiChen test brown');
  })
  test('brown on different divisibility than first', () => {
    expect(helper.setBrownName(className, i, {i: 1})).toBe('kaiChen test dbrown');
  })
})

describe ('block naming by position', () => {
  let props = {row:[1,2,3,4], i:1};
  let props1 = {row:[1,2,3,4,5,6], i:1};
  let lastprop = {lastrow:true, row:[1,2,3,4], i: 1};
  let lastprop1 = {lastrow:true, row:[1,2,3,4,5,6], i: 1};
  test('not lastrow, last element', () => {
    expect(helper.setBlockPositionName(3,props)).toBe('bdblock lastblock dbrown');
  });
  test('not lastrow, not last element', () => {
    expect(helper.setBlockPositionName(3,props1)).toBe('bdblock dbrown');
  });
  test('lastrow, lastelement', () => {
    expect(helper.setBlockPositionName(3,lastprop)).toBe('bdblock lastrowblock dbrown');
  });
  test('lastrow, not last element', () => {
    expect(helper.setBlockPositionName(3,lastprop1)).toBe('bdblock lastrow dbrown');
  })
})

describe ('setting whirlpools', () => {
  let whirlpools = helper.setWhirlPools(7);
  test('5 whirlpools', () => {
    expect(whirlpools.length).toBe(5);
  })
  test('unique whirlpools', () => {
    let unique = true;
    whirlpools.forEach((whirl,i) => {
      for (var j = i+1; j < whirlpools.length; j++) {
        if (whirl === whirlpools[j]) {
          unique = false;
        }
      }
    })
    expect(unique).toBe(true);
  })
})