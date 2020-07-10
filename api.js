module.exports = client => {
    require('express')()
        .all('/*', (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*")
            res.header("Access-Control-Allow-Headers", "X-Requested-With")
            next()
        })
        .get('/', (req, res) => {
            const { user: { username, discriminator, id, tag, avatar, presence: { status } }, ws: { ping }, uptime, guilds: { cache: { size: guilds } }, users: { cache: { size: users } }, channels: { cache: { size: channels } } } = client
            const duration = ms => {
                const sec = Math.floor((ms / 1000) % 60).toString()
                const min = Math.floor((ms / (1000 * 60)) % 60).toString()
                const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
                const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()

                return `${days.padStart(2, '0')}일 ${hrs.padStart(2, '0')}시간 ${min.padStart(2, '0')}분 ${sec.padStart(2, '0')}초`
            }

            res.send({
                code: res.statusCode,
                username,
                id,
                discriminator,
                tag,
                avatar,
                displayAvatarURL: client.user.displayAvatarURL(),
                ping,
                uptime,
                status,
                guilds,
                users,
                channels,
                embed: {
                    title: `${username} API`,
                    url: 'https://api.dittobot.ga/',
                    color: 0x00ff00,
                    thumbnail: {
                        url: client.user.displayAvatarURL()
                    },
                    description: `**ID**: ${id}\n**상태**: ${status}\n**핑**: ${ping}ms\n**업타임**: ${duration(uptime)}\n**서버 수**: ${guilds}개\n**유저 수**: ${users}명\n**채널 수**: ${channels}개`
                }
            })
        })
        .use((req, res) => {
            res.status(404).send({
                code: res.statusCode,
                error: 'Not found'
            })
        })
        .listen(process.env.API_PORT, () => console.log('Server Started... (API)'))
}