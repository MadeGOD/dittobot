const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'pypi',
    aliases: ['ㅔㅛㅔㅑ'],
    category: 'coding',
    run: async (client, message, args, ops) => {
        if (!args[0]) return

        let res

        try {
            res = await fetch(`https://pypi.org/pypi/${encodeURI(args[0])}/json`).then(e => e.json())
        } catch (e) {
            return message.channel.send(`${args[0]} (이)라는 패키지를 찾을 수 없습니다\n${e}`)
        }

        message.channel.send(new MessageEmbed().setAuthor('PyPi', 'https://raw.githubusercontent.com/github/explore/666de02829613e0244e9441b114edb85781e972c/topics/pip/pip.png', 'https://pypi.org/')
            .setTitle(res.info.name)
            .setURL(res.info.package_url)
            .setDescription(res.info.summary.length > 500 ? `${res.info.summary.substr(0, 495)}...` : res.info.summary || "없음")
            .addFields([
                { name: "버전", value: res.info.version, inline: true },
                { name: "라이센스", value: res.info.license || "없음", inline: true },
                { name: "제작", value: res.info.author, inline: true },
                { name: "만들어진 날짜", value: ops.formatTime(res.releases[Object.keys(res.releases)[0]][0].upload_time), inline: true }
            ])
        )
    }
}