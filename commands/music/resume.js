const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "resume",
    aliases: ["ㄱㄷ녀ㅡㄷ", "다시재생", "ektlwotod", "resu", "ㄱㄷ녀"],
    category: "music",
    run: async (client, message, args, ops) => {
        const player = client.musicManager.queue.get(message.guild.id);

        if (!player) return message.channel.send(ops.embed.musicError1);
        if (!message.member.voice.channel) return message.channel.send(ops.embed.musicError2)
        if (player && (message.member.voice.channelID !== player.voiceChannel.id)) return message.channel.send(ops.embed.musicError3(player.voiceChannel.name))
        
        if (player.playing) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 이미 노래가 재생 중이에요!`))
        
        player.resume();
        message.channel.send(new MessageEmbed().setColor(0x00FF00).setDescription(`✅ **${player.songs[0].info.title}**이(가) 다시 재생됩니다!`));
    }
}