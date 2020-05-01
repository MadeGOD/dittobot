module.exports = {
    name: 'money',
    aliases: ['돈', 'ㅡㅐㅜ됴', 'ehs', '내돈', 'soehs'],
    run: async (client, message, args) => {
        let member = message.guild.members.cache.get(args.join(" "));

        if (!member && message.mentions.members) member = message.mentions.members.first();

        if (!member && args.join(" ")) {
            member = message.guild.members.cache.find(member => {
                return member.displayName.toLowerCase().includes(args.join(" ")) ||
                member.user.tag.toLowerCase().includes(args.join(" "))
            });
        }

        if (!member) member = message.member;

        let money = await client.db.get(`money_${member.id}`);
        if (!money) {
            return message.channel.send(`${member.user.tag}님은 돈이 없어요...`)
        }

        message.channel.send(`${member.user.tag}님은 현재 ${money}원 보유 중`)
    }
}