const { MessageEmbed } = require('discord.js'),
    fetch = require('node-fetch')

module.exports = {
    name: 'api',
    aliases: ['메ㅑ'],
    category: 'botinfo',
    run: async (client, message, args) => fetch('https://api.dittobot.ga/').then(e => e.json()).then(e => message.channel.send(new MessageEmbed(e.embed)))
}