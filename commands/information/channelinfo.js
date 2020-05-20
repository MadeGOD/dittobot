const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "channelinfo",
    aliases: ["채널정보", "초무ㅜ디ㅑㅜ래", 'cosjfwjdqh'],
    category: "information",
    usage: '디토야 채널정보 [멘션|ID|채널이름]',
    run: async (client, message, args, ops) => {
        let channel = ops.getChannel(message, args.join(' '));

        const embed = new MessageEmbed().setTitle(`${channel.name} 채널 정보`).setColor(0xffff00).setFooter(channel.guild.name, channel.guild.iconURL()).setTimestamp().addField('🆔 채널 ID', `**${channel.id}**`);

        if (channel.parent) embed.addField('카테고리', `**${channel.parent.name}**`)

        embed.addField('채널 주제', `${channel.topic || "**없음**"}`)
            .addField('채널 타입', `**${type[channel.type]}**`)
            .addField('🎂 채널 생성 시간', `**${ops.formatTime(channel.createdAt)}**`)

        message.channel.send(embed)
    }
}

const type = {
    text: '텍스트 채널',
    voice: '음성 채널',
    news: '공지 채널',
    store: '상점 채널'
}