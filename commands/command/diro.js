const fetch = require('node-fetch')

module.exports = {
    name: 'diro',
    aliases: ['디로', '야개', 'elfh'],
    category: 'command',
    run: async (client, message, args) => {
        if (!args.join(' ')) return message.channel.send('단축할 URL을 입력해 주세요!')

        const res = await fetch('https://diro.ml/api/create', {
            method: 'POST',
            body: JSON.stringify({
                url: args.join(' ')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(e => e.json()).then(e => e.result)

        message.channel.send(`https://diro.ml/${res}`)
    }
}