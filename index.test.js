const discord = require("discord.js");
const client = new discord.Client();
require("./index");
// const disbut = require('discord-buttons');
// disbut(client);

client.on("ready", () => {
  console.log(client.user.tag);
});

client.on("message", (message) => {
  if (message.content.startsWith("o")) {
    /* let btn = new disbut.MessageButton()
            .setStyle('green')
            .setLabel('hey')
            .setID('id'); */

    message.inlineReply("Hey");
  }
});

client.login("");
