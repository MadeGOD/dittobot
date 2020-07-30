module.exports = {
    name: 'slowmode',
    aliases: ['슬로우모드', '니ㅐ즈ㅐㅇㄷ', 'tmffhdnahem'],
    category: 'moderation',
    usage: '{prefix}슬로우모드 [초]',
    run: async (client, message, args) => {
        if (message.channel.type !== "text") return message.channel.send('텍스트 채널에서만 가능한 명령어입니다.')
        if (!args[0]) return message.channel.send(`${message.channel.name}의 슬로우모드는 ${message.channel.rateLimitPerUser}초입니다.`)
        if (isNaN(args[0]) || args[0] < 0 || args[0] > 21600 || args[0].includes('.')) return message.channel.send('0 ~ 21600 사이의 자연수만 입력해 주세요.')

        message.channel.setRateLimitPerUser(parseInt(args[0])).then(() => message.channel.send(`${args[0]}초로 설정되었습니다.`)).catch(e => message.channel.send(`권한이 부족하거나 알 수 없는 오류가 발생했습니다.\n${e}`))
    }
}