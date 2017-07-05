/**
 * Created by xueyingchen.
 */
const builder = require('botbuilder');
const restify = require('restify');

const {botID, botPassword, port} = require('./config');
const {main} = require('./intermediate');

const server = restify.createServer();

server.listen(port, () => {
  console.log(`listening to ${server.name}: ${server.url}`);
});

const connector = new builder.ChatConnector({
  appId: botID,
  appPassword: botPassword
});

const bot = new builder.UniversalBot(connector);

server.post('/api/messages', connector.listen());

const intents = new builder.IntentDialog();

bot.dialog('/', intents);

bot.dialog('/profile', [
  function (session, args) {
    args.then(answer => builder.Prompts.text(session, answer))
  },
  function (session, results) {
    const answer = main(results.response);
    session.beginDialog('/profile', answer);
  }
]);

intents.onDefault([
  function (session, args, next) {
    session.beginDialog('/profile', Promise.resolve('hello'));
  }
]);