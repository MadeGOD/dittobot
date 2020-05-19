const { shorten, custom } = require('isgd');

module.exports = {
    name: "urlshorten",
    aliases: ["url단축", "단축"],
    usage: "디토야 단축 <URL> [CUSTOM]",
    category: "command",
    run: async (client, message, args, ops) => {
        if (!args[0]) return message.channel.send(`**명령어 사용법**\n\`${ops.prefix}단축 <URL> [CUSTOM]\``);

        if (!args[1]) shorten(args[0], (res) => message.channel.send(res));
        else custom(args[0], args[1], (res) => message.channel.send(res));
    }
}