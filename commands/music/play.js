const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "play",
    aliases: ["플레이", "재생", "ㅔㅣ묘", "vmffpdl", "wotod", "pla", "pl"],
    usage: "디토야 재생 <노래 이름|URL>",
    category: "music",
    run: async (client, message, args, ops) => {
        const player = client.musicManager.queue.get(message.guild.id)

        if (!message.guild.me.hasPermission("CONNECT")) return message.channel.send(new MessageEmbed().setDescription("❌ 음성 채널에 들어갈 수 있는 권한이 필요해요! (CONNECT 권한)").setColor(0xFF0000))
        if (!message.guild.me.hasPermission("SPEAK")) return message.channel.send(new MessageEmbed().setDescription("❌ 음성 채널에서 말할 수 있는 권한이 필요해요! (SPEAK 권한)").setColor(0xFF0000))
        
        if (!message.member.voice.channel) return message.channel.send(ops.embed.musicError2)
        if (player && (message.member.voice.channelID !== player.voiceChannel.id)) return message.channel.send(ops.embed.musicError3(player.voiceChannel.name))
        
        if (!args.join(" ")) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 재생할 노래의 이름 또는 URL을 입력해 주세요!`))

        const song = await client.musicManager.getSongs(`ytsearch: ${args.join(" ")}`) || await client.musicManager.getSongs(`scsearch: ${args.join(" ")}`);
        if (!song[0]) return message.channel.send(new MessageEmbed().setDescription(`❌ **${args.join(" ")}**(이)라는 노래를 찾을 수 없습니다.`).setColor(0xFF0000));

        client.musicManager.handleVideo(message, message.member.voice.channel, song[0])
    }
}