const fetch = require('node-fetch')
const { MessageCollector, MessageAttachment } = require('discord.js')

module.exports = {
    name: 'capcha',
    aliases: ['캡챠'],
    run: async (client, message, args) => {
        const { key } = await fetch(`https://openapi.naver.com/v1/captcha/nkey?code=0`, {
            method: 'GET',
            headers: {
                "X-Naver-Client-Id": process.env.NAVER_API_CLIENT_ID,
                "X-Naver-Client-Secret": process.env.NAVER_API_CLIENT_SECRET
            }
        }).then(e => e.json())

        const img = await fetch(`https://openapi.naver.com/v1/captcha/ncaptcha.bin?key=${key}`, {
            method: 'GET',
            headers: {
                "X-Naver-Client-Id": process.env.NAVER_API_CLIENT_ID,
                "X-Naver-Client-Secret": process.env.NAVER_API_CLIENT_SECRET
            }
        }).then(e => e.buffer())

        message.channel.send({ files: [new MessageAttachment(img)] })

        const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 72000 })

        collector.on('collect', async m => {
            const { result, responseTime } = await fetch(`https://openapi.naver.com/v1/captcha/nkey?code=1&key=${key}&value=${encodeURI(m.content)}`, {
                method: 'GET',
                headers: {
                    "X-Naver-Client-Id": process.env.NAVER_API_CLIENT_ID,
                    "X-Naver-Client-Secret": process.env.NAVER_API_CLIENT_SECRET
                }
            }).then(e => e.json())

            message.channel.send(result ? `정답\n${responseTime}초 걸림` : '틀림')
            collector.stop()
        })

        collector.on('end', () => message.channel.send('끝남'))
    }
}