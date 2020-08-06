const { createCanvas } = require('canvas')
const { MessageAttachment } = require('discord.js')

module.exports = {
    name: 'profile_create',
    aliases: ['프사만들기', '프사제작', 'vmtkaksemfrl', 'pc', 'ㅔ개랴ㅣㄷ_ㅊㄱㄷㅁㅅㄷ', 'profile-create', 'ㅔ개랴ㅣㄷ-ㅊㄱㄷㅁㅅㄷ', 'vmtkwpwkr'],
    description: 'https://profile.ditto7890.ga/create 기능을 옮긴 명령어\n\npng, jpg, svg, pdf 지원',
    category: 'command',
    usage: '{prefix}프사만들기 [폰트 크기] <내용>',
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('폰트 크기 또는 내용을 입력해 주세요.')

        const px = isNaN(args[0]) ? 256 : args[0]

        if (px > 512 || px < 5) return message.channel.send('5 ~ 512의 수를 입력해 주세요.')

        const value = args.slice(1).join(' ') || args.join(' ')

        const canvas = createCanvas(512, 512)
        const ctx = canvas.getContext('2d')

        const svgCanvas = createCanvas(512, 512, 'svg')
        const svgCtx = svgCanvas.getContext('2d')

        const pdfCanvas = createCanvas(512, 512, 'pdf')
        const pdfCtx = pdfCanvas.getContext('2d')

        ctx.fillStyle = '#333333'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.font = `${px}px CookieRun Black`
        ctx.textAlign = "center"

        svgCtx.fillStyle = '#333333'
        svgCtx.fillRect(0, 0, svgCanvas.width, svgCanvas.height)
        svgCtx.font = `${px}px CookieRun Black`
        svgCtx.textAlign = "center"

        pdfCtx.fillStyle = '#333333'
        pdfCtx.fillRect(0, 0, pdfCanvas.width, pdfCanvas.height)
        pdfCtx.font = `${px}px CookieRun Black`
        pdfCtx.textAlign = "center"

        if (value.includes('\n')) ctx.textBaseline = 'bottom'
        else ctx.textBaseline = 'middle'

        if (value.includes('\n')) svgCtx.textBaseline = 'bottom'
        else svgCtx.textBaseline = 'middle'

        if (value.includes('\n')) pdfCtx.textBaseline = 'bottom'
        else pdfCtx.textBaseline = 'middle'

        ctx.fillStyle = "white"
        ctx.strokeStyle = "white"

        svgCtx.fillStyle = "white"
        svgCtx.strokeStyle = "white"

        pdfCtx.fillStyle = "white"
        pdfCtx.strokeStyle = "white"

        ctx.strokeText(value, canvas.width / 2, canvas.height / 2)
        ctx.fillText(value, canvas.width / 2, canvas.height / 2)

        svgCtx.strokeText(value, svgCanvas.width / 2, svgCanvas.height / 2)
        svgCtx.fillText(value, svgCanvas.width / 2, svgCanvas.height / 2)

        pdfCtx.strokeText(value, pdfCanvas.width / 2, pdfCanvas.height / 2)
        pdfCtx.fillText(value, pdfCanvas.width / 2, pdfCanvas.height / 2)

        message.channel.send('png', { files: [new MessageAttachment(canvas.toBuffer("image/png"), 'image.png')] })
        message.channel.send('jpg', { files: [new MessageAttachment(canvas.toBuffer("image/jpeg"), 'image.jpg')] })
        message.channel.send('svg', { files: [new MessageAttachment(svgCanvas.toBuffer(), "image.svg")] })
        message.channel.send('pdf', { files: [new MessageAttachment(pdfCanvas.toBuffer(), "image.pdf")] })
    }
}