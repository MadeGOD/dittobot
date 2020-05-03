const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'leaderboard',
    aliases: ['리더보드', 'flejqhem'],
    category: 'money',
    run: async (client, message, args, ops) => {
        let res = await client.db.getAll().then(e => e.sort((a, b) => parseInt(b.value.money) - parseInt(a.value.money)).filter(n => n.key !== ops.ownerID).map((r, i) => `**${i+1}위** ${client.users.cache.get(r.key).tag} - ${parseInt(r.value.money).toLocaleString()}원`).join('\n'))
        if (!res) return message.channel.send('데이터가 없습니다...');
        message.channel.send(new MessageEmbed().setTitle(`${client.user.username} 돈 리더보드 시즌 ${ops.season}`).setDescription(res).setColor(0x00FF00))
    }
}