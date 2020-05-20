const { MessageEmbed } = require("discord.js");
const Choose = ["✌", "✊", "✋"];

module.exports = {
    name: "rps",
    aliases: ["가위 바위 보", "가위바위보"],
    category: "command",
    run: async (client, message, args) => {
        const embed = new MessageEmbed().setColor(0xfffffe).setFooter(message.author.username, message.author.displayAvatarURL()).setTitle(`가위바위보`).setTimestamp();

        message.channel.send(embed).then(async t => {
            await t.react('✌');
            await t.react('✊');
            await t.react('✋');

            t.awaitReactions((reaction, user) => (reaction.emoji.name === '✌' || reaction.emoji.name === '✊' || reaction.emoji.name === '✋') && user.id === message.author.id, {
                max: 1,
                time: 20000
            }).then(async collected => {
                const choose = collected.array()[0].emoji.name;
                const bot = Choose[Math.floor(Math.random() * Choose.length)];
                let result = '';

                if ((choose === "✊" && bot === "✌") || (choose === "✋" && bot === "✊") || (choose === "✌" && bot === "✋")) result = `제가 졌네요... 😭`
                else if (choose === bot) result =  `비겼네요... 😅`;
                else result = `제가 이겼어요! 😀`;

                if (message.guild.me.hasPermission("MANAGE_MESSAGES")) await t.reactions.removeAll();

                t.edit(embed.setTitle(result).setDescription(`**${choose} vs ${bot}**`))
            })
        })
    }
}