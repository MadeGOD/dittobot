const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "profile",
    aliases: ["프사", "내프사", "ㅔ개랴ㅣㄷ", "vmtk", "프로필사진", "vmfhvlftkwls"],
    usage: "디토야 프사 [멘션|ID|유저이름|태그]",
    category: "command",
    run: async (client, message, args, ops) => {
        let member = ops.getMember(message, args.join(" "))
        message.channel.send(new MessageEmbed().setColor(0xfffffe).setTitle(`${member.user.username}님의 프로필 사진`).setURL(member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024})).setImage(member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024})));
    }
}