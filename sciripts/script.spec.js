const getStrAsArr = require('./script.js')

describe('getStrAsArr', function() {
  it('empty string', function() {
    expect(getStrAsArr("")).toEqual([]);
  });
  it('only plus operator', function() {
    expect(getStrAsArr("+")).toEqual([]);
  });
  it('only minus operator', function() {
    expect(getStrAsArr("-")).toEqual([]);
  });
  it('only dot character', function() {
    expect(getStrAsArr(".")).toEqual([]);
  });
  it('signed dot', function() {
    expect(getStrAsArr("-.")).toEqual([]);
  });
  it('signed dot', function() {
    expect(getStrAsArr("+.")).toEqual([]);
  });
  it('only a number', function() {
    expect(getStrAsArr(".89")).toEqual([".89"]);
  });
  it('only a number', function() {
    expect(getStrAsArr("9.89")).toEqual(["9.89"]);
  });
  it('only a number', function() {
    expect(getStrAsArr("9.")).toEqual(["9."]);
  });
  it('only a number', function() {
    expect(getStrAsArr("10")).toEqual(["10"]);
  });
  it('a signed number', function() {
    expect(getStrAsArr("-9.89")).toEqual(["-9.89"]);
  });
  it('a signed number', function() {
    expect(getStrAsArr("+.89")).toEqual(["+.89"]);
  });
  it('a signed number', function() {
    expect(getStrAsArr("-9.")).toEqual(["-9."]);
  });
  it('a signed number', function() {
    expect(getStrAsArr("+10")).toEqual(["+10"]);
  });
  it('end string with no numbers', function() {
    expect(getStrAsArr("-23./.45*+.788*-89.4555/+85/8*")).toEqual(
        ["-23.", "/", ".45", "*", "+.788", "*", "-89.4555", "/", "+85", "/", "8"]);
  });
  it('end string with no numbers', function() {
    expect(getStrAsArr("-23./.45*+.788*-89.4555/+85/8*+")).toEqual(
        ["-23.", "/", ".45", "*", "+.788", "*", "-89.4555", "/", "+85", "/", "8"]);
  });
  it('end string with no numbers', function() {
    expect(getStrAsArr("-23./.45*+.788*-89.4555/+85/8*-.")).toEqual(
        ["-23.", "/", ".45", "*", "+.788", "*", "-89.4555", "/", "+85", "/", "8"]);
  });
  it('start and end string with numbers', function() {
    expect(getStrAsArr("23/.45*+.788*-89.4555/+85/88")).toEqual(
        ["23", "/", ".45", "*", "+.788", "*", "-89.4555", "/", "+85", "/", "88"]);
  });
});