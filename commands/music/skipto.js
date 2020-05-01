const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "skipto",
    aliases: ['스킵투', '나ㅑㅔ새', 'tmzlqxn'],
    category: "music",
    run: async (client, message, args) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 현재 재생 중인 음악이 없어요!`));
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 음성 채널에 먼저 들어가 주세요!`))
        
        if (!serverQueue.playing) serverQueue.playing = true;

        if (args[0] >= serverQueue.songs.length || args[0] < 0 || isNaN(args[0]) || args[0].includes('.')) return message.channel.send(new MessageEmbed().setDescription(`❌ `).setColor(0xFF0000));

        serverQueue.songs.splice(0, parseInt(args[0] - 1));
        serverQueue.skip()
    }
};