module.exports = {
    name: 'money',
    aliases: ['돈', 'ㅡㅐㅜ됴', 'ehs', '내돈', 'soehs'],
    category: 'money',
    run: async (client, message, args) => {
        let member = client.users.cache.get(args.join(" "));

        if (!member && message.mentions.users) member = message.mentions.users.first();

        if (!member && args.join(" ")) {
            member = client.users.cache.find(member => {
                return member.username.toLowerCase().includes(args.join(" ")) || member.tag.toLowerCase().includes(args.join(" "))
            })
        };

        if (!member) member = message.author;

        let money = await client.db.get(member.id);
        if (!money) return message.channel.send(`${member.tag}님은 돈이 없어요...`);

        message.channel.send(`${member.tag}님은 현재 ${money.money}원 보유 중`)
    }
}