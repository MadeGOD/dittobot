const { MessageEmbed } = require('discord.js'),
    translate = require('@vitalets/google-translate-api')

module.exports = {
    name: 'translate',
    aliases: ['번역', 'ㅅㄱ무님ㅅㄷ', 'qjsdur'],
    category: 'command',
    usage: '디토야 번역 <시작언어|자동> <번역언어> <메세지>',
    run: async (client, message, args) => {
        if (args[0] === 'auto' || args[0] === '자동') {
            if (!args[1]) return message.channel.send('번역 언어를 입력해 주세요')
            if (!args.slice(2).join(" ")) return message.channel.send('번역할 메세지를 입력해 주세요')

            translate(args.slice(2).join(" "), { to: args[1] }).then(r => message.channel.send(new MessageEmbed().setAuthor('Google Translate', 'https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png', 'https://translate.google.co.kr/').setTitle('구글 번역').setColor(0x00ff00).setDescription(`**${r.from.language.iso}** -> **${args[1]}**\n\n**번역 전**\n\`\`\`fix\n${args.slice(2).join(" ")}\n\`\`\`\n**번역 후**\n\`\`\`yml\n${r.text}\n\`\`\``).setFooter('https://github.com/Pneuma714/Pod/blob/master/commands/utilities/translate.js'))).catch(e => message.channel.send(`구글 번역기에서 지원하지 않은 언어이거나, 알 수 없는 오류가 발생했습니다\n${e}`))
        } else {
            if (!args[0]) return message.channel.send('시작 언어를 입력해 주세요')
            if (!args[1]) return message.channel.send('번역 언어를 입력해 주세요')
            if (!args.slice(2).join(" ")) return message.channel.send('번역할 메세지를 입력해 주세요')

            translate(args.slice(2).join(" "), { from: args[0], to: args[1] }).then(r => message.channel.send(new MessageEmbed().setAuthor('Google Translate', 'https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png', 'https://translate.google.co.kr/').setTitle('구글 번역').setColor(0x00ff00).setDescription(`**${args[0]}** -> **${args[1]}**\n\n**번역 전**\n\`\`\`fix\n${args.slice(2).join(" ")}\n\`\`\`\n**번역 후**\n\`\`\`yml\n${r.text}\n\`\`\``).setFooter('https://github.com/Pneuma714/Pod/blob/master/commands/utilities/translate.js'))).catch(e => message.channel.send(`구글 번역기에서 지원하지 않은 언어이거나, 알 수 없는 오류가 발생했습니다\n${e}`))
        }
    }
}