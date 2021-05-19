import Discord from 'discord.js';

export class Message extends Discord.Message {
    /** Send an inline reply to a message. This is different to the regular .reply() method as it uses Discord's embedded replying functionality. */
    public lineReply(
        content: Discord.APIMessageContentResolvable | (Discord.MessageOptions & { split?: false }) | Discord.MessageAdditions,
      ): Promise<Message>;
    public lineReply(options: Discord.MessageOptions & { split: true | Discord.SplitOptions }): Promise<Message[]>;
    public lineReply(options: Discord.MessageOptions | Discord.APIMessage): Promise<Message | Message[]>;
    public lineReply(
        content: Discord.StringResolvable,
        options: (Discord.MessageOptions & { split?: false }) | Discord.MessageAdditions,
    ): Promise<Message>;
    public lineReply(
        content: Discord.StringResolvable,
        options: Discord.MessageOptions & { split: true | Discord.SplitOptions },
    ): Promise<Message[]>;
    public lineReply(content: Discord.StringResolvable, options: Discord.MessageOptions): Promise<Message | Message[]>;

    /** Send an inline reply to a message, while not pinging the user being replied to. This is different to the regular .reply() method as it uses Discord's embedded replying functionality. */
    public lineReplyNoMention(
        content: Discord.APIMessageContentResolvable | (Discord.MessageOptions & { split?: false }) | Discord.MessageAdditions,
      ): Promise<Message>;
    public lineReplyNoMention(options: Discord.MessageOptions & { split: true | Discord.SplitOptions }): Promise<Message[]>;
    public lineReplyNoMention(options: Discord.MessageOptions | Discord.APIMessage): Promise<Message | Message[]>;
    public lineReplyNoMention(
        content: Discord.StringResolvable,
        options: (Discord.MessageOptions & { split?: false }) | Discord.MessageAdditions,
    ): Promise<Message>;
    public lineReplyNoMention(
        content: Discord.StringResolvable,
        options: Discord.MessageOptions & { split: true | Discord.SplitOptions },
    ): Promise<Message[]>;
    public lineReplyNoMention(content: Discord.StringResolvable, options: Discord.MessageOptions): Promise<Message | Message[]>;
}