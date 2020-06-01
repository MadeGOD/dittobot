const { MessageEmbed } = require('discord.js')

module.exports = {
    ownerID: process.env.OWNER_ID,
    prefix: process.env.PREFIX,
    formatTime: time => {
        const date = new Date(time);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours() + 1}시 ${date.getMinutes() + 1}분 ${date.getSeconds() + 1}초`
    },
    getMember: (msg, mem) => {
        let member = msg.guild.members.cache.get(mem);

        if (!member && msg.mentions.members) member = msg.mentions.members.first();
        if (!member && mem) member = msg.guild.members.cache.find(m => m.displayName.toLowerCase().includes(mem) || m.user.username.toLowerCase().includes(mem) || m.user.tag.toLowerCase().includes(mem));
        if (!member) member = msg.member;

        return member
    },
    getChannel: (msg, ch) => {
        let channel = msg.guild.channels.cache.get(ch);

        if (!channel && msg.mentions.channels) channel = msg.mentions.channels.first();
        if (!channel && ch) channel = msg.guild.channels.cache.find(m => m.name.toLowerCase().includes(ch));
        if (!channel) channel = msg.channel;

        return channel
    },
    embed: {
        musicError1: new MessageEmbed().setColor(0xFF0000).setTitle(`❌ 현재 재생 중인 음악이 없어요!`),
        musicError2: new MessageEmbed().setColor(0xFF0000).setTitle(`❌ 음성 채널에 먼저 들어가 주세요!`),
        musicError3: name => new MessageEmbed().setColor(0xFF0000).setDescription(`❌ **${name}** 채널로 들어가 주세요!`)
    }
}