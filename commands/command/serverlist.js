const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "serverlist",
    aliases: ["서버목록", "서버리스트"],
    category: "command",
    run: async (client, message, args) => {
        const embed = new MessageEmbed().setTitle(`${client.user.username} 서버 리스트 (${client.guilds.cache.size}개의 서버)`).setColor(0xffff00).setFooter(client.user.username, client.user.displayAvatarURL()).setTimestamp()

        message.channel.send(`${client.emojis.cache.get('677129501645209601')} 불러오는 중...`).then(async e => {
            await e.react('◀')
            await e.react('▶')

            const collector = await e.createReactionCollector((reaction, user) => (reaction.emoji.name === '◀' || reaction.emoji.name === '▶') && user.id === message.author.id, {
                time: 20000
            })

            let i = 0

            collector.on('collect', async c => {
                try {
                    const guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map(e => `**${e.name} - ${e.memberCount}명 | \`${e.owner.user.tag}\`** ${invite}`).slice(i, i + 5).join('\n')
                    e.edit('', embed.setDescription(guilds))
                } catch(e) {
                    return message.channel.send(`에러\n${e}`)
                }

                if (c.emoji.name === '◀') {
                    i -= 5
                } else {
                    i += 5
                }

                if (i < 0) {
                    i += 5
                } else if (i > client.guilds.cache.size) {
                    i -= 5
                }

                await c.users.remove(message.author.id)
                await collector.resetTimer({
                    time: 20000
                })
            }).on('end', async m => {
                if (message.guild.me.hasPermission("MANAGE_MESSAGES")) await m.reactions.removeAll()
            })
        })
    }
};