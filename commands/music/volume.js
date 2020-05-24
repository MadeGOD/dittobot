const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "volume",
    aliases: ['vol', '볼륨', '사운드', '소리', 'setvolume', 'qhffba', 'tkdnsem'],
    category: "music",
    run: async (client, message, args, ops) => {
        const player = client.musicManager.queue.get(message.guild.id);

        if (!player) return message.channel.send(ops.embed.musicError1);
        if (!message.member.voice.channel) return message.channel.send(ops.embed.musicError2)
        if (player && (message.member.voice.channelID !== player.voiceChannel.id)) return message.channel.send(ops.embed.musicError3(player.voiceChannel.name))

        if (!args[0]) return message.channel.send(`현재 볼륨은 **\`${player.volume}%\`** 입니다!`);

        if (isNaN(args[0]) || args[0].includes('.') || parseInt(args[0]) <= 0 || parseInt(args[0]) > 100) return message.channel.send(new MessageEmbed().setDescription(`❌ 1 ~ 100 까지의 자연수만 입력해 주세요!`).setColor(0x00FF00));

        player.setVolume(parseInt(args[0].replace('%', '')));
        message.channel.send(`✅ 볼륨을 **\`${parseInt(args[0])}%\`**(으)로 변경했어요!`);
    }
};