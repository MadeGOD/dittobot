const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "kick",
    aliases: ["추방", "cnqkd", "킥", "ㅏㅑ차"],
    usage: "디토야 추방 <멘션|ID|유저이름|태그> [이유]",
    category: "moderation",
    run: async (client, message, args, ops) => {
        if (!args.join(' ')) return message.reply('추방할 멤버를 멘션 또는 ID로 적어주세요.');

        if (message.deletable) message.delete();

        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("❌ 추방 권한이 필요해요...");
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(`❌ ${client.user.username}에게 추방 권한이 필요해요...`);

        const toKick = ops.getMember(message, args.join(' '));

        if (!toKick) return message.channel.send('멤버를 찾을 수 없습니다...');

        if (message.author.id === toKick.id) return message.channel.send('자기 자신을 추방할 수 없습니다...');
        if (client.user.id === toKick.id) return message.channel.send(`${client.user.username}으로 ${client.user.username}을 추방할 수 없습니다...`);

        if (!toKick.kickable) return message.channel.send('역할이 높아서 추방을 못 하겠네요...');

        const embed = new MessageEmbed().setColor(0xffff00)
            .setThumbnail(toKick.user.displayAvatarURL())
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setTimestamp()
            .setTitle('멤버 추방')
            .setDescription(stripIndents`**추방된 멤버**\n${toKick}\n\n**추방한 사람**\n${message.author}\n\n**이유**\n${args.slice(1).join(" ") ? args.slice(1).join(" ") : "없움"}`);

        const promtEmbed = new MessageEmbed().setColor(0x00ff00).setDescription(`**${toKick}**님을 추방하실 건가요?`);

        message.channel.send(promtEmbed).then(async (msg) => {
            await msg.react('✅');
            await msg.react('❎');

            msg.awaitReactions((reaction, user) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❎') && user.id === message.author.id, {
                max: 1
            }).then((collected) => {
                if (collected.array()[0].emoji.name === '✅') {
                    msg.delete();

                    toKick.kick(args.slice(1).join(" ") || null).catch(err => message.channel.send(`Error...\n${err}`));
    
                    message.channel.send(embed)
                } else {
                    msg.delete();

                    message.channel.send('추방이 취소 되었습니다!')
                }
            })
        })
    }
}