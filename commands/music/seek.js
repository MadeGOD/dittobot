const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "seek",
    aliases: ["ㄴㄷ다"],
    category: "music",
    run: async (client, message, args, ops) => {
        const player = client.musicManager.queue.get(message.guild.id);

        if (!player) return message.channel.send(ops.embed.musicError1);
        if (!message.member.voice.channel) return message.channel.send(ops.embed.musicError2)
        if (player && (message.member.voice.channelID !== player.voiceChannel.id)) return message.channel.send(ops.embed.musicError3(player))

        if (args[0].includes(".") || args[0].split(":").some(t => isNaN(t))) return message.channel.send(new MessageEmbed().setColor(0xff0000).setDescription(`❌ **${args[0]}**(으)로 스킵을 할 수 없습니다.`))
        
        const seeked = player.seek(...args[0].split(":").reverse().map(t => parseInt(t)))

        message.channel.send(new MessageEmbed().setColor(0x00FF00).setDescription(`✅ **${[seeked]}**(으)로 스킵되었습니다!`))
    }
}