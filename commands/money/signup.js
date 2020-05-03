const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'signup',
    aliases: ['가입', 'rkdlq', '냐후ㅕㅔ'],
    category: 'money',
    run: async (client, message, args) => {
        const checkAccount = await client.db.get(message.author.id)
        if (checkAccount) return message.channel.send('이미 가입이 되어 있습니다.')

        let filter = (reaction, user) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && user.id === message.author.id

        message.channel.send(new MessageEmbed().setTitle(`${client.user.username} 가입`).setColor(0x00FFFF).setDescription(`${client.user.username}의 돈 기능 등을 이용하실려면 가입이 필요합니다.\n\n${client.user.username} 가입을 하실려면 ✅를, 가입을 원하시지 않으신다면 ❌를 눌러주세요.`)).then(async e => {
            await e.react('✅');
            await e.react('❌');
            const collector = await e.createReactionCollector(filter, {
                time: 20000,
                max: 1
            });

            collector.on('end', async (collected) => {
                if (collected.size > 0 && collected.first().emoji.name === '✅') {
                    await client.db.set(message.author.id, { money: 0, level: 0 })
                    e.edit(new MessageEmbed().setTitle(`✅ ${client.user.username} 가입 완료!`).setColor(0x00FF00))
                } else {
                    e.edit(new MessageEmbed().setTitle(`❌ ${client.user.username} 가입이 취소되었습니다.`).setColor(0xFF0000))
                };
                
                if (message.guild.me.hasPermission("MANAGE_MESSAGES")) e.reactions.removeAll()
            })
        })
    }
}