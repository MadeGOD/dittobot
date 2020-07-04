const { shorten, custom } = require("isgd")

module.exports = {
    name: "isgd",
    aliases: ["ㅑㄴㅎㅇ", "is.gd", "ㅑㄴ.ㅎㅇ"],
    usage: "{prefix}is.gd <URL> [CUSTOM]",
    category: "command",
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("단축할 URL을 입력해 주세요.")

        if (!args[1]) shorten(args[0], res => message.channel.send(res))
        else custom(args[0], args[1], res => message.channel.send(res))
    }
}