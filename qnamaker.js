/**
 * Created by xueyingchen.
 */
const axios = require('axios');

const {knowledgeBaseID, qnaKey} = require('./config');

const qna = axios.create({
  headers: {
    'Ocp-Apim-Subscription-Key': qnaKey,
    'Content-Type': 'application/json'
  }
});

const getUrl = (ID) =>
  `https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/${knowledgeBaseID}/generateAnswer`;


const getAnswer = (text) =>
  qna.post(getUrl(knowledgeBaseID), {
    question: text,
    top: 1
  }).then(res => res.data.answers)
    .then(answers => answers.map(item => item.answer).join(''))
    .catch(err => console.error(err));

module.exports = {
  getAnswer
};