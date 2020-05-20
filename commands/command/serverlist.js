const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "serverlist",
    aliases: ["서버목록", "서버리스트"],
    category: "command",
    run: async (client, message, args) => {
        message.channel.send('❌ 현재 다시 짜고 있는 코드입니다')
    }
}