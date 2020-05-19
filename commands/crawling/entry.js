const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'entry',
    aliases: ['엔트리', 'dpsxmfl', '둣교', '엔틜', 'dpsxmlf'],
    category: 'crawling',
    run: async (client, message, args) => {
        if (!args.join(' ')) return message.channel.send('검색할 엔트리 유저 닉네임을 입력해 주세요!')

        let res

        try {
            res = await fetch(`https://playentry.org/api/getUserByUsername/${encodeURI(args.join(' '))}`).then(e => e.json())
            if (!res) return message.channel.send(`${args.join(' ')}(이)라는 유저를 찾을 수 없습니다...\n1. 탈퇴한 유저\n2. 존재하지 않는 유저`)
        } catch (e) {
            return message.channel.send(`에러\n${e}`)
        }

        const { username, description, _id, role, avatarImage, blogImage } = res
        const project = await fetch(`https://playentry.org/api/project/find?option=list&tab=my_project&type=project&user=${_id}`).then(e => e.json())
        const discuss = await fetch(`https://playentry.org/api/discuss/find?username=${encodeURI(username)}`).then(e => e.json())

        const embed = new MessageEmbed().setColor(0x00ff00).setTitle(username).setURL(`https://playentry.org/${encodeURI(args.join(' '))}`).addField('상태메세지', description ? description : "없음").addField('계정', roles[role]).addField('🆔 ID', _id).addField('작품 수', project.count, true)
        
        embed.setThumbnail(!avatarImage ? 'https://playentry.org/img/assets/avatar_img.png' : `https://playentry.org/uploads/profile/${_id.substr(0, 2)}/${_id.substr(2, 2)}/avatar_${_id}.png`)

        if (blogImage) embed.setImage(`https://playentry.org/uploads/profile/${_id.substr(0, 2)}/${_id.substr(2, 2)}/blog_${_id}.png`)
        
        let like = 0, visitCount = 0, commentCount = 0, childCount = 0

        for (let i of project.data) {
            like += i.likeCnt
            visitCount += i.visit
            commentCount += i.comment
            childCount += i.childCnt
        }

        embed.addField('❤ 좋아요 수', parseInt(like).toLocaleString(), true).addField('👀 조회수', parseInt(visitCount).toLocaleString(), true).addField('🗨 작품 댓글 수', parseInt(commentCount).toLocaleString(), true).addField('작품 사본 수', parseInt(childCount).toLocaleString(), true).addField('💬 글 수', parseInt(discuss.count).toLocaleString(), true)

        message.channel.send(embed)
    }
}

const roles = {
    member: '학생 계정',
    student: '학생 계정',
    teacher: '선생님 계정',
    admin: '관리자 계정(운영자님)'
}