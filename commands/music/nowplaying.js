const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "nowplaying",
    aliases: ['np', 'ㅞ', 'now-playing', 'nowplay', 'ㅜㅐ제ㅣ묘ㅑㅜㅎ', '현재음악', '현재곡', 'guswodmadkr', 'gusworhr', '지금곡', 'wlrmarhr', '지금음악', 'wlrmadmadkr', '지금노래', 'wlrmashfo', '현재노래', 'guswoshfo'],
    category: "music",
    run: async (client, message, args, ops) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(ops.embed.musicError1)

        const song = serverQueue.songs[0];

        message.channel.send(new MessageEmbed().setThumbnail(`https://img.youtube.com/vi/${song.info.identifier}/mqdefault.jpg`).setTitle(song.info.title).setURL(song.info.uri).setDescription(`${serverQueue.playing ? "🎶 재생 중" : "⏸ 일시 정지됨"}\n채널: **${song.info.author}**\n\`${serverQueue.songProgress()}\`\n${serverQueue.duration(serverQueue.player.state.position)} / ${serverQueue.duration(song.info.length)} (${serverQueue.percent()}%)`).setColor(0x00FF00));
    }
}