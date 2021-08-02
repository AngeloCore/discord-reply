<div align="center">

  <p>
    <a href="https://www.npmjs.com/package/discord-reply"><img src="https://img.shields.io/npm/v/discord-reply?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/discord-reply"><img src="https://img.shields.io/npm/dt/discord-reply?maxAge=3600" alt="NPM downloads" /></a>
  </p>

  <p>
    <a href="https://www.npmjs.com/package/discord-reply"><img src="https://nodei.co/npm/discord-reply.png?downloads=true&stars=true" alt="NPM Banner"></a>
  </p>
</div>

> Now working with [discord-buttons](https://npmjs.com/package/discord-buttons)!

## Install
```sh
$ npm i discord-reply
```
## Setup
```js
const discord = require('discord.js');
const client = new discord.Client();
require('discord-reply');
```

## Example
```js
const discord = require('discord.js');
const client = new discord.Client();
require('discord-reply');

client.on('ready', () => {
  console.log(client.user.tag)
});

client.on('message', async message => {
  if (message.content.startsWith('!reply')) {
    message.inlineReply('Hey'); // Inline Reply with mention

    message.inlineReplyNoMention(`My name is ${client.user.username}`); // Inline Reply without mention
  }
});

client.login('TOKEN');
```

## Embed
```js
if (message.content.startsWith('!reply')) {
  let embed = new discord.MessageEmbed()
  .setDescription(`Reply to ${message.author}`);

  message.inlineReply(embed); // Inline Reply with mention

  //or

  message.inlineReplyNoMention(embed); // Inline Reply without mention
}
```

<h2 style="display:inline;">Edit</h2> <h4 style="display:inline;">(Async Function)</h4>

```js
if (message.content.startsWith('!ping')) {

  let m = await message.inlineReply('Ping');

  let ping = (m.createdTimestamp - message.createdTimestamp);

  m.edit(`${ping}ms`)
}
```

## Command Handler
```js
/**
 * No need to define
 * */
module.exports = {
  name: 'reply',
  category: 'Test',
  run: (client, message, args) => {
    message.inlineReply('This is reply with @mention');
  }
}
```

<hr>

## Contact

[Youtube](https://www.youtube.com/channel/UCxxK71QFN4_PrBhCFmH2Jmw), [Discord](https://discord.gg/5JtyYqW)