const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')
const moment = require('moment-timezone')
moment.locale('ko-KR')

module.exports = {
    name: 'entry',
    aliases: ['엔트리', 'dpsxmfl', '둣교'],
    category: 'crawling',
    run: async (client, message, args) => {
        if (!args.join(' ')) return message.channel.send('검색할 엔트리 유저 닉네임을 입력해 주세요!')

        let res

        try {
            res = await fetch(`https://playentry.org/api/getUserByUsername/${args.join(' ')}`).then(e => e.json())
            if (!res) return message.channel.send(`${args.join(' ')}(이)라는 유저를 찾을 수 없습니다...\n1. 탈퇴한 유저\n2. 존재하지 않는 유저`)
        } catch (e) {
            return message.channel.send(`Error\n${e}`)
        }

        const { username, description, _id, role, avatarImage, created } = res

        if (!username) return message.channel.send(`${args.join(' ')}(이)라는 유저를 찾을 수 없습니다...`)

        const embed = new MessageEmbed().setColor(0x00ff00).setTitle(username).setURL(`https://playentry.org/${args.join(' ')}`).setThumbnail(avatarImage ? `https://playentry.org/uploads/profile/${_id.substr(0, 2)}/${_id.substr(2, 2)}/avatar_${_id}.png` : 'https://playentry.org/img/assets/avatar_img.png').addField('상태메세지', description).addField('계정', roles[role])
        if (created) embed.addField('가입 날짜', moment(created).tz('Asia/seoul').format('YYYY년 MM월 DD일'))

        message.channel.send(embed)
    }
}

const roles = {
    member: '학생 계정',
    teacher: '선생님 계정',
    admin: '관리자 계정(운영자님)'
}