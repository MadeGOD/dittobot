const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "invite",
    aliases: ["초대링크", "초대", "봇초대", "ㅑㅜ퍗ㄷ", "cheofldzm"],
    category: "command",
    run: async (client, message, args) => {
        message.channel.send(new MessageEmbed().setColor(0x00ff00).setTitle(`${client.user.username} 초대링크`).setDescription(`[관리자 권한으로 초대하기](https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)\n[추천 권한으로 초대하기](https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=37092416&scope=bot)`).setAuthor(client.user.username, client.user.displayAvatarURL()).setThumbnail(client.user.displayAvatarURL()))
    }
}