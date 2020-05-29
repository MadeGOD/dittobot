const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggestion",
    aliases: ["건의", "rjsdml", "녛ㅎㄷㄴ샤ㅐㅜ"],
    usage: "디토야 건의 <내용>",
    category: "command",
    run: async (client, message, args, ops) => {
        if (!args.join(" ")) return message.channel.send("건의할 내용을 입력해 주세요");

        client.users.cache.get(ops.ownerID).send(new MessageEmbed().setTitle("건의").setColor(0x00ff00).setFooter(message.author.username, message.author.displayAvatarURL()).setDescription(args.join(" ")).setTimestamp())
    }
}