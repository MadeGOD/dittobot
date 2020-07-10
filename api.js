module.exports = client => {
    require('express')()
        .all('/*', (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*")
            res.header("Access-Control-Allow-Headers", "X-Requested-With")
            next()
        })
        .get('/', (req, res) => {
            res.send({
                code: res.statusCode,
                username: client.user.username,
                id: client.user.id,
                avatar: client.user.avatar,
                displayAvatarURL: client.user.displayAvatarURL(),
                ping: client.ws.ping,
                uptime: client.uptime,
                status: client.user.presence.status,
                guilds: client.guilds.cache.size,
                users: client.users.cache.size,
                channels: client.channels.cache.size
            })
        })
        .use((req, res) => {
            res.status(404).send({
                code: res.statusCode,
                message: 'Not found'
            })
        })
        .listen(process.env.API_PORT, () => console.log('Server Started... (API)'))
}