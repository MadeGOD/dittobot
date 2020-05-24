const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "stop",
    aliases: ['leave', 'ㅣㄷㅁㅍㄷ', 'dc',"disconnect", '스탑', 'tmxkq', 'ㄴ새ㅔ', '멈춰', '정지', 'wjdwl', '나가', 'skrk', '꺼져'],
    category: "music",
    run: async (client, message, args, ops) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(ops.embed.musicError1);
        if (!message.member.voice.channel) return message.channel.send(ops.embed.musicError2)
        
        serverQueue.destroy();
        message.channel.send(new MessageEmbed().setColor(0x00FF00).setTitle(`✅ 모든 대기열이 제거되었습니다!`));
    }
}