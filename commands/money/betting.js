module.exports = {
    name: 'betting',
    aliases: ['베팅', '배팅', 'qoxld', 'qpxld'],
    category: 'money',
    cooldowns: 60,
    run: async (client, message, args) => {
        let ran = Math.floor(Math.random() * 2)
        let money = await client.db.get(`money_${message.author.id}`)

        if (!args[0]) return message.channel.send('베팅할 돈을 입력해 주세요!')
        if (isNaN(args[0]) || args[0].includes('.') || parseInt(args[0]) <= 0 || parseInt(args[0]) > money) return message.channel.send('ㄴㄴ');

        if (ran === 0) {
            await client.db.set(`money_${message.author.id}`, money - args[0])
            message.channel.send(`베팅 실패...\n${money}원 -> ${money - args[0]}원... (-${args[0]}원)`)
        } else {
            await client.db.set(`money_${message.author.id}`, money + (args[0] * (Math.floor(Math.random() * 2) + 2)))
            message.channel.send(`베팅 성공...!\n${money}원 -> ${money + (args[0] * (Math.floor(Math.random() * 2) + 2))}원! (+${args[0] * (Math.floor(Math.random() * 2) + 2)}원)`)
        }
    }
}