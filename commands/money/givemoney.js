module.exports = {
    name: 'givemoney',
    aliases: ['돈내놔', '돈줘', 'ehssoshk', 'ehswnj'],
    category: 'money',
    cooldowns: 30,
    run: async (client, message, args, ops) => {
        let get = await client.db.get(message.author.id);
        let ran = Math.floor(Math.random() * 90) + 10;

        if (!get) return message.reply(`${client.user.username} 가입을 먼저 해 주세요!\n\`${ops.prefix}가입\``)
        else client.db.set(message.author.id, { money: get.money + ran, level: get.level });

        message.channel.send(`${get.money ? get.money : 0}원 -> ${get.money ? get.money + ran : ran}원 (+${ran}원)`)
    }
}