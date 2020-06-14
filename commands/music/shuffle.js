const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "shuffle",
    aliases: ["노ㅕㄹ릳", "섞어"],
    category: "music",
    run: async (client, message, args, ops) => {
        const player = client.musicManager.queue.get(message.guild.id);

        if (!player) return message.channel.send(ops.embed.musicError1);
        if (!message.member.voice.channel) return message.channel.send(ops.embed.musicError2)
        if (player && (message.member.voice.channelID !== player.voiceChannel.id)) return message.channel.send(ops.embed.musicError3(player))

        if (!player.songs[2]) return message.channel.send(new MessageEmbed().setTitle("❌ 대기열이 2개 이상이어야 됩니다!").setColor(0xff0000))
        
        player.songs = [player.songs[0]].concat(player.songs.slice(1).sort(() => Math.random() - 0.5))
        message.channel.send(new MessageEmbed().setTitle("✅ 대기열이 섞어졌습니다!").setColor(0x00ff00))
    }
}