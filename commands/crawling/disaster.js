const { MessageEmbed } = require("discord.js"),
    fetch = require("node-fetch")

module.exports = {
    name: "disaster",
    aliases: ["재난문자",, "wosksanswk", "얀ㅁㄴㅅㄷㄱ"],
    category: "crawling",
    run: async (client, message, args) => {
        const res = await fetch("http://m.safekorea.go.kr/idsiSFK/neo/ext/json/disasterDataList/disasterDataList.json").then(e => e.json()).then(e => e.slice(0, 5).map(a => `${a.CONT} (${a.SJ})`).join('\n\n'))
        
        message.channel.send(new MessageEmbed().setTitle("재난 문자").setColor(0x00ff00).setDescription(res))
    }
}