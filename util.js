/**
 * Created by xueyingchen.
 */
const {inspect} = require('util');

const Segment = require('segment');
const segment = new Segment();

segment.useDefault();
segment.loadDict(__dirname + '/userdict.utf8');

const {judge_words, hard_codes} = require('./dict');

const SUB_LEVEL = {
  u: 1000,
  d: 100,
  g: 10,
  i: 1
};

const isInArray = (arr) => (item) => arr.indexOf(item) !== -1;
const sortObject = (pred) => (obj) => obj.keys()
  .sort(pred(obj))
  .reduce((key, sortedObj) => Object.assign(
    sortedObj,
    {key: obj[key]}
  ));

exports.getWords = (input) => {
  return segment.doSegment(input, {
    simple: true,
    stripPunctuation: true
  })
};

exports.mergeContext = (oldC, newC) => Object.assign(oldC, newC);

exports.isJudge = (words) => {
  const judge = isInArray(judge_words);
  const common = isInArray(hard_codes);
  return words.some(item => judge(item)) && !words.some(item => common(item))
};

// TODO debug
exports.testLog = (...args) => {
  const result = inspect(args, {showHidden: false, depth: null});
  console.log(result);
};

exports.isInArray = isInArray;
exports.SUB_LEVEL = SUB_LEVEL;