const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "userinfo",
    aliases: ["정보", "내정보", "user-info", "user-information", "user", "info-user", "user_info", "유저정보"],
    usage: "디토야 유저정보 [멘션|ID|유저이름|태그]",
    category: "information",
    run: async (client, message, args, ops) => {
        let member = ops.getMember(message, args.join(" "))

        const embed = new MessageEmbed().setTitle(`${member.user.username}님의 정보`).setFooter(member.user.username, member.user.displayAvatarURL()).setThumbnail(member.user.displayAvatarURL()).setColor(member.displayHexColor === "#000000" ? "#FFFFFF" : member.displayHexColor).setTimestamp()
            .addField(`${client.emojis.cache.get("709051340067962950")} 유저 이름`, member.user.username)
        
        if (member.user.username !== member.displayName) embed.addField(`${client.emojis.cache.get("709051340067962950")} 디스플레이 이름`, member.displayName)

        embed.addField(`${client.emojis.cache.get("709051340067962950")} 디스코드 태그`, member.user.tag)
            .addField("🆔 ID", member.user.id)

        if (member.user.presence.status !== "offline" && !member.user.bot) embed.addField(`${client.emojis.cache.get("709051340067962950")} 디스코드 클라이언트`, Object.keys(member.user.presence.clientStatus).map(e => clientStatus[e]).join(', '))

        embed.addField("상태", `${status[member.user.presence.status]} (${member.user.presence.status})`)
            .addField("📥 서버에 들어온 날짜", ops.formatTime(member.joinedAt))
            .addField("📥 디스코드 가입 날짜", ops.formatTime(member.user.createdAt))

        if (member.presence.activities[0]) embed.addField("상태 메세지/게임", member.presence.activities.map(a => `${a.type === "CUSTOM_STATUS" ? `상태메세지: ${a.emoji ? a.emoji && a.state ? `${a.emoji} ${a.state}` : a.emoji : a.state}` : `게임: ${a.name}`}`).join("\n"))

        const embed2 = new MessageEmbed().setTitle(member.roles.cache.filter(n => n.id !== message.guild.id).size > 30 ? `${member.user.username}님의 역할 (${member.roles.cache.filter(n => n.id !== message.guild.id).size}개 중 30개)` : `${member.user.username}님의 역할 (${member.roles.cache.filter(n => n.id !== message.guild.id).size}개)`).setDescription(member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).slice(0, 30).join(", ") || "없음").setColor(member.displayHexColor === "#000000" ? "#FFFFFF" : member.displayHexColor)

        message.channel.send(embed)
        if (member.roles.cache.size) message.channel.send(embed2)
    }
}

const status = {
    online: "🟢 온라인",
    idle: "🌙 자리 비움",
    dnd: "⛔ 다른 용무 중",
    offline: "🔳 오프라인"
}

const clientStatus = {
    desktop: '🖥 디스코드 앱',
    web: '⌨ 웹',
    mobile: '📱 모바일'
}