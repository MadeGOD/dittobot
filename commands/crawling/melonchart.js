const cheerio = require("cheerio");
const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "melonchart",
    aliases: ["멜론차트", "멜차", "melcha", "ㅡ디촘", "ㅡ디ㅐㅜ촘ㄳ", "apffhsckxm", "apfck"],
    category: "crawling",
    run: async (client, message, args) => {
        await axios.get("http://www.melon.com/chart/").then(res => {
            if (res.status !== 200) return;

            const $ = cheerio.load(res.data);

            let result = {};

            $("div.wrap > div.wrap_song_info > div.ellipsis.rank01").each((i, element) => result[i]["title"] = $(element).find("span > a").text());
            $("div.wrap > div.wrap_song_info > div.ellipsis.rank02").each((i, element) => result[i]["artist"] = $(element).find("span.checkEllipsis > a").text());

            message.channel.send(new MessageEmbed().setTitle("멜론 차트 1위 ~ 10위").setColor(0x00ff00).setAuthor("Melon", "https://img1.daumcdn.net/thumb/C500x500.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/5fXt/image/YUEdn1eyBz1ThXP4wqiosPurn28.png", "https://melon.com/").setDescription(result.map(e => e.title).join("\n")).setFooter(`${$("div.calendar_prid > span.yyyymmdd > span.year").text()} ${$("span.hhmm > span.hour").text()} 업데이트`).setTimestamp())
        })
    }
}