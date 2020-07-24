const { createCanvas } = require('canvas')
const { MessageAttachment } = require('discord.js')

module.exports = {
    name: 'profile_create',
    aliases: ['프사만들기', '프사제작', 'vmtkaksemfrl', 'pc', 'ㅔ개랴ㅣㄷ_ㅊㄱㄷㅁㅅㄷ', 'profile-create', 'ㅔ개랴ㅣㄷ-ㅊㄱㄷㅁㅅㄷ', 'vmtkwpwkr'],
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('폰트 크기를 입력해 주세요.')

        const px = isNaN(args[0]) ? 256 : args[0]

        if (px > 512 || px < 5) return message.channel.send('5 ~ 512의 수를 입력해 주세요.')

        const canvas = createCanvas(512, 512)
        const ctx = canvas.getContext('2d')
        const value = args.slice(1).join(' ') || args[0]

        ctx.fillStyle = 'rgb(51, 51, 51)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.font = `${px}px CookieRun Black`
        ctx.textBaseline = 'middle'
        ctx.textAlign = "center"

        ctx.fillStyle = "white"
        ctx.strokeStyle = "white"

        ctx.strokeText(value, canvas.width / 2, canvas.height / 2)
        ctx.fillText(value, canvas.width / 2, canvas.height / 2)

        message.channel.send({ files: [new MessageAttachment(canvas.toBuffer())] })
    }
}