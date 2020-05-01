const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'leaderboard',
    aliases: ['리더보드', 'flejqhem'],
    run: async (client, message, args) => {
        let res = await client.db.getAll().then(e => e.sort((a, b) => parseInt(b.value) - parseInt(a.value)).map((r, i) => `**${i+1}위** ${client.users.cache.get(r.key.replace('money_','')).tag} - ${parseInt(r.value).toLocaleString()}원`).join('\n'));
        if (!res) {return message.channel.send('데이터가 없습니다...')};
        message.channel.send(new MessageEmbed().setTitle(`${client.user.username} 돈 리더보드`).setDescription(res).setColor(0x00FF00))
    }
}