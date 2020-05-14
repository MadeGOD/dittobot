const { MessageEmbed } = require("discord.js");
const os = require('os')

module.exports = {
    name: 'system',
    aliases: ['시스템', 'tltmxpa', '뇬ㅅ드'],
    category: 'botinfo',
    run: async (client, message, args) => {
        message.channel.send(new MessageEmbed().setTitle(`${client.user.username} 시스템 정보`).setColor(0x00ff00).setDescription(`PLATFORM: **${process.platform}**\nARCH: **${process.arch}**\nCPU: **${os.cpus()[0].model}**\n메모리: **${((os.totalmem() / (1024 * 1024)) - (os.freemem() / (1024 * 1024))).toFixed(2)}MB / ${(os.totalmem() / (1024 * 1024)).toFixed(2)}MB** (${(100 - (os.freemem() / os.totalmem()) * 100).toFixed(2)}%)`))
    }
}