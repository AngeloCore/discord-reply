const { Structures } = require("discord.js");
var APIMessage = require("discord.js").APIMessage;

function isInstalled(x) {
  try {
    return (
      process.moduleLoadList.indexOf("NativeModule " + x) >= 0 ||
      require("fs").existsSync(require.resolve(x))
    );
  } catch (e) {
    return false;
  }
}

function emitWarning() {
  process.emitWarning(
    "`Message#lineReply` and `Message#lineReplyNoMention` are deprecated, " +
      "please use `Message#inlineReply` and `Message#inlineReplyNoMention` instead",
    "DeprecationWarning"
  );
}

if (isInstalled("discord-buttons") === true)
  APIMessage = require("discord-buttons").APIMessage;

class Message extends Structures.get("Message") {
  async lineReply(content, options) {
    emitWarning();

    let mentionRepliedUser =
      typeof ((options || content || {}).allowedMentions || {}).repliedUser ===
      "undefined"
        ? true
        : (options || content).allowedMentions.repliedUser;

    const apiMessage =
      content instanceof APIMessage
        ? content.resolveData()
        : APIMessage.create(this.channel, content, options).resolveData();
    Object.assign(apiMessage.data, {
      message_reference: { message_id: this.id },
    });

    if (
      !apiMessage.data.allowed_mentions ||
      Object.keys(apiMessage.data.allowed_mentions).length === 0
    ) {
      apiMessage.data.allowed_mentions = {
        parse: ["users", "roles", "everyone"],
      };
    }

    if (typeof apiMessage.data.allowed_mentions.replied_user === "undefined") {
      Object.assign(apiMessage.data.allowed_mentions, {
        replied_user: mentionRepliedUser,
      });
    }

    if (Array.isArray(apiMessage.data.content)) {
      return Promise.all(
        apiMessage
          .split()
          .map((x) => {
            x.data.allowed_mentions = apiMessage.data.allowed_mentions;
            return x;
          })
          .map(this.lineReply.bind(this))
      );
    }

    const { data, files } = await apiMessage.resolveFiles();
    return this.client.api.channels[this.channel.id].messages
      .post({ data, files })
      .then((d) => this.client.actions.MessageCreate.handle(d).message);
  }

  async lineReplyNoMention(content, options) {
    emitWarning();

    const apiMessage =
      content instanceof APIMessage
        ? content.resolveData()
        : APIMessage.create(this.channel, content, options).resolveData();
    Object.assign(apiMessage.data, {
      message_reference: { message_id: this.id },
    });

    if (
      !apiMessage.data.allowed_mentions ||
      Object.keys(apiMessage.data.allowed_mentions).length === 0
    ) {
      apiMessage.data.allowed_mentions = {
        parse: ["users", "roles", "everyone"],
      };
    }

    Object.assign(apiMessage.data.allowed_mentions, { replied_user: false });

    if (Array.isArray(apiMessage.data.content)) {
      return Promise.all(
        apiMessage
          .split()
          .map((x) => {
            x.data.allowed_mentions = apiMessage.data.allowed_mentions;
            return x;
          })
          .map(this.lineReply.bind(this))
      );
    }

    const { data, files } = await apiMessage.resolveFiles();
    return this.client.api.channels[this.channel.id].messages
      .post({ data, files })
      .then((d) => this.client.actions.MessageCreate.handle(d).message);
  }

  async inlineReply(content, options) {
    let mentionRepliedUser =
      typeof ((options || content || {}).allowedMentions || {}).repliedUser ===
      "undefined"
        ? true
        : (options || content).allowedMentions.repliedUser;

    const apiMessage =
      content instanceof APIMessage
        ? content.resolveData()
        : APIMessage.create(this.channel, content, options).resolveData();
    Object.assign(apiMessage.data, {
      message_reference: { message_id: this.id },
    });

    if (
      !apiMessage.data.allowed_mentions ||
      Object.keys(apiMessage.data.allowed_mentions).length === 0
    ) {
      apiMessage.data.allowed_mentions = {
        parse: ["users", "roles", "everyone"],
      };
    }

    if (typeof apiMessage.data.allowed_mentions.replied_user === "undefined") {
      Object.assign(apiMessage.data.allowed_mentions, {
        replied_user: mentionRepliedUser,
      });
    }

    if (Array.isArray(apiMessage.data.content)) {
      return Promise.all(
        apiMessage
          .split()
          .map((x) => {
            x.data.allowed_mentions = apiMessage.data.allowed_mentions;
            return x;
          })
          .map(this.inlineReply.bind(this))
      );
    }

    const { data, files } = await apiMessage.resolveFiles();
    return this.client.api.channels[this.channel.id].messages
      .post({ data, files })
      .then((d) => this.client.actions.MessageCreate.handle(d).message);
  }

  async inlineReplyNoMention(content, options) {
    const apiMessage =
      content instanceof APIMessage
        ? content.resolveData()
        : APIMessage.create(this.channel, content, options).resolveData();
    Object.assign(apiMessage.data, {
      message_reference: { message_id: this.id },
    });

    if (
      !apiMessage.data.allowed_mentions ||
      Object.keys(apiMessage.data.allowed_mentions).length === 0
    ) {
      apiMessage.data.allowed_mentions = {
        parse: ["users", "roles", "everyone"],
      };
    }

    Object.assign(apiMessage.data.allowed_mentions, { replied_user: false });

    if (Array.isArray(apiMessage.data.content)) {
      return Promise.all(
        apiMessage
          .split()
          .map((x) => {
            x.data.allowed_mentions = apiMessage.data.allowed_mentions;
            return x;
          })
          .map(this.inlineReplyNoMention.bind(this))
      );
    }

    const { data, files } = await apiMessage.resolveFiles();
    return this.client.api.channels[this.channel.id].messages
      .post({ data, files })
      .then((d) => this.client.actions.MessageCreate.handle(d).message);
  }
}

Structures.extend("Message", () => Message);
