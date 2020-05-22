module.exports = {
    name: 'blacklist',
    aliases: ['블랙리스트', 'ㅠㅣㅁ차ㅣㅑㄴㅅ', 'qmfforfltmxm'],
    category: 'owner',
    developer: !0,
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send(await client.blacklist.getAll().then(e => e.map(a => a.key).join(' | ')) || '없음')

        if (await client.blacklist.get(args[0])) {
            await client.blacklist.delete(args[0])
            message.channel.send(`**${client.users.cache.get(args[0]).tag || args[0]}**님이 블랙리스트에 제거되었습니다`)
        } else {
            await client.blacklist.set(args[0], { date: new Date(), reason: args.slice(1).join(' ') || null })
            message.channel.send(`**${client.users.cache.get(args[0]).tag || args[0]}**님이 블랙리스트에 추가되었습니다`)
        }
    }
}