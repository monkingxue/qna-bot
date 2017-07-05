/**
 * Created by xueyingchen.
 */
const fuzz = require('fuzzball');

const {processInput} = require('./preprocess');
const {mergeContext, testLog} = require('./util');
const {getAnswer} = require('./qnamaker');
const {getLuisResult} = require('./luis');

let context = {};
const YES = '是的';
const NO = '很抱歉，不是';

function main(input) {
  const {subModel, sentence, judgment} = processInput(input);
  modifyContext(subModel);
  testLog(subModel, sentence, judgment, context, composeSub(context) + sentence);
  if (judgment) {
    return getLuisResult(sentence)
      .then(result => composeSub(context) + result)
      .then(question => {
        testLog(question);
        return getAnswer(question)
      })
      .then(answer => {
        testLog(answer, input);
        return fuzz.partial_ratio(answer, input) >= 80
      })
      .then(judgement => judgement ? YES : NO)
  } else {
    return getAnswer(composeSub(context) + sentence)
  }
}

function modifyContext(subModel) {
  context = subModel.u ? subModel : mergeContext(context, subModel);
}

function composeSub(subModel) {
  const defaultProp = (prop, defaultV = '') => prop || defaultV;
  return '同济大学' + defaultProp(subModel.d) + defaultProp(subModel.g) + defaultProp(subModel.i)
}

module.exports = {
  main
};