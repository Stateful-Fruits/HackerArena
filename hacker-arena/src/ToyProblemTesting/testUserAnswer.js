import Test from './framework.js';
  
const runTestsOnUserAnswer = function(userInputString, tests) {
  const runOneTest = function(testStr) {
    const testData = parseTestStr(testStr);
    
    try {
      const results = eval(testStr)
      results.inputs = testData.inputs;
      return results
    } catch(e) {
      return {
        actual: e,
        expected: testData.expected,
        passed: false,
        inputs: testData.inputs
      };
    }
  }
  
  try {
    eval(userInputString);

    return tests.map(test => runOneTest(test));
  } catch(e) {
    return {
      userInputErr: e
    };
  }
}

const parseTestStr = function(testStr) {
  const matchParens = /\((.*)\)/ // second group
  const matchSecondArg = /\((.*)\)\s*,(.*)/ // third group 
  
  const args = testStr.match(matchParens)[1];
  const inputs = args.match(matchParens)[1].split(',');
  const expected = args.match(matchSecondArg)[2]
  
  return {
    inputs: inputs,
    expected: expected
  }
}

export default runTestsOnUserAnswer;

/*
// TESTING

var sampleUserInput = `
  var add = function(a, b) {
    if (helper(a, b)) {
      return a + b;
    } else {
      return 'sorry!';
    }
  }

  const helper = function(a, b) {
    return a && b;
  }
`

var sampleTests = [
  `Test.assertEquals(add(5,6), 11)`,
  `Test.assertEquals(add.add(5, 6), 'sorry!')`
]

//console.log(parseTestStr(sampleTests[0]))
console.log(testUserAnswer(sampleUserInput, sampleTests))
*/