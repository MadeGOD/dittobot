const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'seek',
    aliases: ['ㄴㄷ다'],
    category: 'music',
    run: async (client, message, args) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 현재 재생 중인 음악이 없어요!`));
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 음성 채널에 먼저 들어가 주세요!`))

        if (isNaN(args[0]) || args[0].includes('.') || parseInt(args[0]) <= 0 || parseInt(args[0]) > serverQueue.songs[0].info.length) return message.channel.send(new MessageEmbed().setColor(0xff0000).setDescription('현재 입력한 수가 영상의 길이보다 많거나, 자연수가 아닙니다!'))
        if (serverQueue.songs[0].info.isSeekable) {
            serverQueue.player.seek(parseInt(args[0]))
            message.channel.send(new MessageEmbed().setColor(0x00ff00).setDescription('성공'))
        } else {
            message.channel.send(new MessageEmbed().setColor(0xff0000).setDescription('실패'))
        }
    }
}