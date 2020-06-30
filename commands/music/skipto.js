const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "skipto",
    aliases: ["스킵투", "나ㅑㅔ새", "tmzlqxn"],
    category: "music",
    run: async (client, message, args, ops) => {
        const player = client.musicManager.queue.get(message.guild.id)

        if (!player) return message.channel.send(ops.embed.musicError1)
        if (!message.member.voice.channel) return message.channel.send(ops.embed.musicError2)
        if (player && (message.member.voice.channelID !== player.voiceChannel.id)) return message.channel.send(ops.embed.musicError3(player))
        
        if (!player.playing) player.playing = true

        if (args[0] > player.songs.length || args[0] < 0 || isNaN(args[0]) || args[0].includes(".")) return message.channel.send(new MessageEmbed().setDescription(`❌ **${args[0]}**으로 스킵할 수 없습니다.`).setColor(0xFF0000))

        player.songs.splice(0, parseInt(args[0] - 1))
        player.skip()
    }
}