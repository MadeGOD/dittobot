module.exports = {
    name: 'betting',
    aliases: ['베팅', '배팅', 'qoxld', 'qpxld'],
    category: 'money',
    cooldowns: 15,
    run: async (client, message, args, ops) => {
        let ran = Math.floor(Math.random() * 2)
        let money = await client.db.get(message.author.id)

        if (!money) return message.reply(`${client.user.username} 가입을 먼저 해 주세요!\n\`${ops.prefix}가입\``)

        if (!args[0]) return message.reply('베팅할 돈을 입력해 주세요!')
        if (isNaN(args[0]) || args[0].includes('.') || parseInt(args[0]) <= 0 || parseInt(args[0]) > money.money) return message.reply('ㄴㄴ');

        if (ran === 0) {
            await client.db.set(message.author.id, { money: money.money - args[0], level: money.level })
            message.reply(`베팅 실패...\n${money.money}원 -> ${money.money - args[0]}원... (-${args[0]}원)`)
        } else {
            let random = Math.floor(Math.random() * 2) + 2
            await client.db.set(message.author.id, { money: money.money + (args[0] * random), level: money.level })
            message.reply(`베팅 성공...!\n${money.money}원 -> ${money.money + (args[0] * random)}원! (+${args[0] * random}원)`)
        }
    }
}