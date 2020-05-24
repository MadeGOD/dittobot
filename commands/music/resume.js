const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'resume',
    aliases: ['ㄱㄷ녀ㅡㄷ', '다시재생', 'ektlwotod', 'resu', 'ㄱㄷ녀'],
    category: 'music',
    run: async (client, message, args, ops) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(ops.embed.musicError1);
        if (!message.member.voice.channel) return message.channel.send(ops.embed.musicError2)
        
        if (serverQueue.playing) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 이미 노래가 재생 중이에요!`))
        
        serverQueue.resume();
        message.channel.send(new MessageEmbed().setColor(0x00FF00).setDescription(`✅ **${serverQueue.songs[0].info.title}**이(가) 다시 재생됩니다!`));
    }
};