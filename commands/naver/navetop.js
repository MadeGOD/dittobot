const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "navertop",
    aliases: ["네이버실검", "실검", "spdlqjtlfrja", "tlfrja", "ㅜㅁㅍㄷㄱ새ㅔ"],
    category: "naver",
    run: async (client, message, args) => fetch("https://www.naver.com/srchrank?frm=main").then(e => e.json()).then(a => message.channel.send(new MessageEmbed().setAuthor("Naver", "https://www.naver.com/favicon.ico?1", "https://naver.com/").setTitle("네이버 실시간 검색어").setColor(0x00ff00).setTimestamp().setDescription(a.data.slice(0, 10).map((e, i) => `**${i+1}위**\n[${e.keyword}](https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=${e.keyword.replace(/ /g, "+")})\n`)).setFooter(message.author.username, message.author.displayAvatarURL())))
}