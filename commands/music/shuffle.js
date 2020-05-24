const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'shuffle',
    aliases: ['노ㅕㄹ릳', '섞어'],
    category: 'music',
    run: async (client, message, args, ops) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(ops.embed.musicError1);
        if (!message.member.voice.channel) return message.channel.send(ops.embed.musicError2)

        serverQueue.songs = [serverQueue.songs[0]].concat(serverQueue.songs.slice(1).sort(() => Math.random() - 0.5))
        message.channel.send(new MessageEmbed().setTitle('✅ 대기열이 섞어졌습니다!').setColor(0x00ff00))
    }
}