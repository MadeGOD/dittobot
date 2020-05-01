module.exports = {
    name: 'givemoney',
    aliases: ['돈내놔', '돈줘', 'ehssoshk', 'ehswnj'],
    category: 'money',
    cooldowns: 60,
    run: async (client, message, args) => {
        let get = await client.db.get(`money_${message.author.id}`);
        let ran = Math.floor(Math.random() * 90) + 10;

        if (!get) {
            client.db.set(`money_${message.author.id}`, ran);
        } else {
            client.db.set(`money_${message.author.id}`, get + ran)
        };

        message.channel.send(`${get ? get : 0}원 -> ${await client.db.get(`money_${message.author.id}`)}원 (+${ran}원)`)
    }
}