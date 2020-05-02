module.exports = {
    name: 'season',
    aliases: ['시즌', 'tlwms', 'ㄴㄷㅁ내ㅜ'],
    category: 'money',
    run: async (client, message, args, ops) => {
        message.channel.send(`시즌 ${ops.season - 1} 결과\n${season1.map((e, i) => `**${i+1}위** ${client.users.cache.get(e).tag}`).join('\n')}`)
    }
}

const season1 = ['685095151991128070', '495776817937121301', '629127293880631316']