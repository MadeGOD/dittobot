const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'unban',
    aliases: ['언밴', 'djsqos', 'ㅕㅜㅠ무'],
    category: 'moderation',
    usage: '{prefix}언밴 <ID> [이유]',
    run: async (client, message, args) => {
        if (!args[0]) return message.reply('언밴할 멤버를 ID로 적어주세요.')

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("❌ 차단 권한이 필요합니다.")
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`❌ ${client.user.username}의 권한에 **차단 권한**이 필요합니다.`)

        message.guild.members.unban(args[0], args.slice(1).join(" ") || null).then(e => message.channel.send(new MessageEmbed().setTitle('멤버 언밴').setColor(0x00ff00).setFooter(e.tag, e.displayAvatarURL()).setDescription(`${e.tag}님이 ${message.guild.name}에서 언밴 처리되었습니다.`))).catch(e => message.channel.send(`알 수 없는 오류가 발생했습니다.\n${e}`))
    }
}