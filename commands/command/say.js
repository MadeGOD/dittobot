const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "say",
    aliases: ["말해", "따라해", "akfgo", "ㄴ묘"],
    category: "command",
    run: async (client, message, args) => {
        if (!args.join(' ')) return;
        if (message.deletable) message.delete()

        if (args[0] === "임베드") {
            if (args[1] === '익명') message.channel.send(new MessageEmbed().setColor("RANDOM").setDescription(args.slice(2).join(" ")))
            else message.channel.send(new MessageEmbed().setColor("RANDOM").setDescription(`${args.slice(1).join(" ")}\n${message.author.username}님의 메세지`))
        }
        else if (args[0] === "익명") message.channel.send(args.slice(1).join(" "))
        else message.channel.send(`${args.join(" ")}\n${message.author.username}님의 메세지`)
    }
}