const fetch = require("node-fetch"),
    { MessageEmbed } = require("discord.js")

module.exports = {
    name: "me2.do",
    aliases: ["ㅡㄷ2.애"],
    category: "naver",
    run: async (client, message, args) => {
        if (!args.join(" ")) return

        const { result: { url } } = await fetch("https://openapi.naver.com/v1/util/shorturl", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Naver-Client-Id": process.env.NAVER_API_CLIENT_ID,
                "X-Naver-Client-Secret": process.env.NAVER_API_CLIENT_SECRET
            },
            body: `url=${args.join(" ")}`
        }).then(e => e.json())

        message.channel.send(new MessageEmbed().setTitle("단축 결과").setColor(0x00ff00).setDescription(`[\`\`\`\n들어가기\n\`\`\`](${url})\n${url}`))
    }
}