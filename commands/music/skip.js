const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "skip",
    aliases: ['스킵', 'tmzlq'],
    category: "music",
    run: async (client, message, args, ops) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(ops.embed.musicError1);
        if (!message.member.voice.channel) return message.channel.send(ops.embed.musicError2)
        
        if (!serverQueue.playing) serverQueue.playing = true;

        serverQueue.skip();
        message.channel.send(new MessageEmbed().setColor(0x00FF00).setTitle("스킵 완료!").setDescription(`✅ **[${serverQueue.songs[0].info.title}](${serverQueue.songs[0].info.uri})**이(가) 스킵되었습니다!`));
    }
};