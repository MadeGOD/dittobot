module.exports = {
    name: 'money',
    aliases: ['돈', 'ㅡㅐㅜ됴', 'ehs', '내돈', 'soehs'],
    run: async (client, message, args) => {
        message.channel.send(`${await client.db.get(`money_${message.author.id}`)}원`)
    }
}