const moment = require('moment-timezone')
moment.locale('ko-KR')

module.exports = {
    name: 'tag',
    aliases: ['태그', 'ㅅㅁㅎ', 'xorm'],
    category: 'command',
    run: async (client, message, args) => {
        if (!args[0]) return

        if (args[0] === "add" || args[0] === '추가' || args[0] === '생성') {
            if (!args[1]) return message.channel.send('추가할 태그의 이름을 써 주세요.')
            if (!args.slice(2).join(' ')) return message.channel.send('내용을 써 주세요.')

            const tagCheck = await client.tagDb.getAll().then(n => n.filter(a => a.value.guild === message.guild.id).find(e => e.key === `${message.guild.id}_${args[1]}`))
            if (tagCheck) return message.channel.send('이미 존재하는 태그입니다.')

            if (client.commands.get(args[1]) || client.aliases.get(args[1])) return message.channel.send('디토봇에 존재하는 커멘드 이름은 추가되지 않습니다.')
            if (args[1].includes('@everyone') || args[1].includes('@here')) return message.channel.send('태그에는 everyone, here 멘션이 되지 않습니다.')
            
            await client.tagDb.set(`${message.guild.id}_${args[1]}`, {
                name: args[1],
                description: args.slice(2).join(' '),
                guild: message.guild.id,
                user: message.author.id,
                usageCount: 0,
                createdAt: moment()._d
            })
            message.channel.send(`\`${args[1]}\` 태그가 추가되었습니다.`)
        } else if (args[0] === 'rank' || args[0] === '랭킹') {
            const tags = await client.tagDb.getAll().then(n => n.filter(a => a.value.guild === message.guild.id).sort((a, b) => parseInt(b.value.usageCount) - parseInt(a.value.usageCount)).map((r, i) => `**${i+1}위** \`${r.key.replace(`${message.guild.id}_`, '')}\` - \`${r.value.usageCount}회\``).join('\n'))
            if (!tags) return message.channel.send('태그 데이터가 없습니다.')

            message.channel.send(`**${message.guild.name} 서버의 태그 랭킹**\n${tags}`)
        } else if (args[0] === 'list' || args[0] === '리스트' || args[0] === '목록') {
            const tags = await client.tagDb.getAll().then(n => n.filter(a => a.value.guild === message.guild.id).map(e => `\`${e.value.name}\``).join(' | '))
            if (!tags) return message.channel.send('태그 데이터가 없습니다.')

            message.channel.send(`**${message.guild.name} 서버의 태그 목록**\n${tags}`)
        } else if (args[0] === 'reset' || args[0] === '초기화') {
            if (message.author.id !== process.env.OWNER_ID) return message.channel.send(`\`${client.user.username} 개발자\`만 가능합니다.`)
            await client.tagDb.clear()

            message.channel.send('모든 태그 삭제 완료')
        } else if (args[0] === 'info' || args[0] === '정보') {
            const tag = await client.tagDb.getAll().then(n => n.filter(a => a.value.guild === message.guild.id).find(e => e.key === `${message.guild.id}_${args[1]}`))
            if (!tag) return message.channel.send(`\`${args.slice(1).join(' ')}\`(이)라는 태그를 찾을 수 없습니다.`)

            message.channel.send(`**${args[1]} 태그 정보**\nDescription: **${tag.value.description}**\n만들어진 날짜: **${moment(tag.value.createdAt).tz('Asia/seoul').format('YYYY년 MM일 DD일')}**\n만든 사람: **${client.users.cache.get(tag.value.user).tag}**\n사용 횟수: **${tag.value.usageCount}회**`)
        } else if (args[0] === 'edit' || args[0] === '수정') {
            const tag = await client.tagDb.getAll().then(n => n.filter(a => a.value.guild === message.guild.id).find(e => e.key === `${message.guild.id}_${args[1]}`))
            if (!tag) return message.channel.send(`\`${args[1]}\`(이)라는 태그를 찾을 수 없습니다.`)

            if ((message.author.id !== tag.user) && (message.author.id !== process.env.OWNER_ID) && (message.author.id !== message.guild.owner.id)) return message.channel.send(`\`${args[1]}\`(이)라는 태그를 수정할 권한이 부족합니다.\n태그를 만든 사람, 태그의 서버장, ${client.user.username} 개발자만 수정 가능`)

            await client.tagDb.set(`${message.guild.id}_${args[1]}`, {
                name: args[1],
                description: args.slice(2).join(' '),
                guild: tag.value.guild,
                user: tag.value.user,
                usageCount: tag.value.usageCount,
                createdAt: tag.value.createdAt
            })
            message.channel.send(`\`${args[1]}\` 태그를 수정하였습니다.`)
        } else if (args[0] === 'remove' || args[0] === '삭제') {
            const tag = await client.tagDb.getAll().then(n => n.filter(a => a.value.guild === message.guild.id).find(e => e.key === `${message.guild.id}_${args[1]}`))
            if (!tag) return message.channel.send(`\`${args[1]}\`(이)라는 태그를 찾을 수 없습니다.`)

            if ((message.author.id !== tag.user) && (message.author.id !== process.env.OWNER_ID) && (message.author.id !== message.guild.owner.id)) return message.channel.send(`\`${args[1]}\`(이)라는 태그를 삭제할 권한이 부족합니다.\n태그를 만든 사람, 태그의 서버장, ${client.user.username} 개발자만 삭제 가능`)

            await client.tagDb.delete(`${message.guild.id}_${args[1]}`)
            message.channel.send(`\`${args[1]}\`(이)라는 태그를 삭제하였습니다.`)
        } else {
            const tag = await client.tagDb.getAll().then(n => n.filter(a => a.value.guild === message.guild.id).find(e => e.key === `${message.guild.id}_${args[0]}`))
            if (!tag) return message.channel.send(`\`${args[0]}\`(이)라는 태그를 찾을 수 없습니다.`)

            await client.tagDb.set(`${message.guild.id}_${args[0]}`, {
                name: args.join(' '),
                description: tag.value.description,
                guild: tag.value.guild,
                user: tag.value.user,
                usageCount: tag.value.usageCount + 1,
                createdAt: tag.value.createdAt
            })

            message.channel.send(tag.value.description
                .replace(/{user_name}/g, message.author.username)
                .replace(/{user_id}/g, message.author.id)
                .replace(/{user_tag}/g, message.author.tag)
                .replace(/{mention}/g, `<@${message.author.id}>`)
                .replace(/{user_id}/g, message.author.id)
                .replace(/{user_discriminator}/g, message.author.discriminator)
                .replace(/{channel_name}/g, message.channel.name)
                .replace(/{channel_id}/g, message.channel.id)
                .replace(/{channel_type}/g, message.channel.type)
                .replace(/{user_display_name}/g, message.member.displayName)
                .replace(/{user_avatar}/g, message.author.avatar)
                .replace(/{user_status}/g, message.author.presence.status)
            )
        }
    }
}