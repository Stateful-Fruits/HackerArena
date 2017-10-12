class Test {

  static assertEquals(actual, expected) {
    const passed = actual === expected;

    return {
      actual: actual,
      expected: expected,
      passed: passed
    }
  }
}

export default Test;