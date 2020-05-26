const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "loopqueue",
    aliases: ["ㅣㅐㅐㅔ벼뎓", 'queuerepeat', "qrepeat", "repeatq", "repeatqueue", '대기열반복', 'eorldufqksqhr', '재생목록반복', 'wotodahrfhrqksqhr', 'loopqueue', 'queueloop', 'ㅣㅐㅐㅔ벼뎓', '벼뎌디ㅐㅐㅔ', '루프대기열', 'fnvmeorlduf'],
    category: "music",
    run: async (client, message, args, ops) => {
        const player = client.musicManager.queue.get(message.guild.id);

        if (!player) return message.channel.send(ops.embed.musicError1);
        if (!message.member.voice.channel) return message.channel.send(ops.embed.musicError2)
        if (player && (message.member.voice.channelID !== player.voiceChannel.id)) return message.channel.send(ops.embed.musicError3(player.voiceChannel.name))

        player.loopQueue = !player.loopQueue;
        message.channel.send(new MessageEmbed().setColor(0x00FF00).setDescription(`✅ ${player.loopQueue ? "지금부터 대기열이 반복됩니다!" : "지금부터 대기열 반복이 되지 않습니다!"}`));
    }
}