/**
 * Created by xueyingchen.
 */
const LUISClient = require("./luis_sdk");

const {luisID, luisKey} = require('./config');

const LUIS = LUISClient({
  appId: luisID,
  appKey: luisKey,
  verbose: true
});

const luis = (text) =>
  new Promise((resolve, reject) => {
    LUIS.predict(text, {
      onSuccess: (res) => resolve(res),

      onFailure: (err) => reject(res)
    });
  });

const getLuisResult = (text) => luis(text)
  .then(res => {
    const top = res.topScoringIntent.intent;
    return top + res.entities.map(item => item.entity).join('')
  }).catch(err => console.error(err))
;

module.exports = {
  getLuisResult
};