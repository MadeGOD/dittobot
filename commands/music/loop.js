const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'loop',
    aliases: ['루프', '뤂', 'ㅣㅐㅐㅔ', 'fnvm', '반복', 'qksqhr'],
    category: 'music',
    run: async (client, message, args, ops) => {
        const player = client.musicManager.queue.get(message.guild.id);

        if (!player) return message.channel.send(ops.embed.musicError1);
        if (!message.member.voice.channel) return message.channel.send(ops.embed.musicError2)
        if (player && (message.member.voice.channelID !== player.voiceChannel.id)) return message.channel.send(ops.embed.musicError3(player.voiceChannel.name))

        
    }
}