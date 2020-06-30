const { MessageEmbed } = require("discord.js"),
    axios = require("axios"),
    cheerio = require("cheerio")

module.exports = {
    name: "namuwiki",
    aliases: ["나무위키", "꺼무위키", "ㅜ므ㅕ쟈ㅏㅑ", "skandnlzl"],
    usage: "디토야 나무위키 <내용>",
    category: "crawling",
    run: async (client, message, args) => {
        if (!args.join(" ")) return

        await axios.get(`https://namu.wiki/Search?q=${encodeURI(args.join(" "))}`).then(res => {
            if (res.status !== 200) return message.channel.send("정보를 불러올 수 없습니다.")

            const $ = cheerio.load(res.data)

            let str = ''

            $("div.search-item").each((i, element) => {
                if (i < 9) str += `[${$(element).find("h4 > a").text().trim()}](https://namu.wiki${$(element).find("h4 > a").attr("href")})\n`
            })

            if (!str) return message.channel.send("검색 결과가 없습니다")
    
            message.channel.send(new MessageEmbed().setTitle("꺼무위키 검색 결과").setDescription(str).setColor(0x008275))
        })
    }
}