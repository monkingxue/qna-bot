/**
 * Created by xueyingchen.
 */
const {getWords, isInArray, isJudge, testLog} = require('./util');

const {u_words, d_words, i_words, g_words} = require('./dict');

const list = [
  {type: 'u', dict: u_words},
  {type: 'd', dict: d_words},
  {type: 'g', dict: g_words},
  {type: 'i', dict: i_words}
].map(({type, dict}) => ({type, inDict: isInArray(dict)}));

// subject model
// {
//   u: xxx,
//   d: xxx,
//   g: xxx,
//   i: xxx
// }

function processInput(input) {
  const subModel = {};
  const words = getWords(input);
  testLog(words);
  let sentence = words.map((item) => {
    let flag = false;
    for (let {type, inDict} of list) {
      if (inDict(item)) {
        subModel[type] = item;
        flag = true;
        break;
      }
    }
    return flag ? '' : item;
  }).join('');

  return {
    subModel,
    sentence,
    judgment: isJudge(words)
  };
}

// test

module.exports = {
  processInput
};