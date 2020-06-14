module.exports = {
    name: 'slowmode',
    aliases: ['슬로우모드', '니ㅐ즈ㅐㅇㄷ', 'tmffhdnahem'],
    category: 'moderation',
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send(`${message.channel.rateLimitPerUser}초`)
        if (isNaN(args[0]) || args[0] < 0 || args[0] > 21600) return message.channel.send('0 ~ 21600 사이의 수를 입력해 주세요')

        message.channel.setRateLimitPerUser(parseInt(args[0])).then(() => message.channel.send(`${args[0]}초로 설정 완료`)).catch(e => message.channel.send(`권한이 부족하거나 알 수 없는 오류가 발생했습니다\n${e}`))
    }
}