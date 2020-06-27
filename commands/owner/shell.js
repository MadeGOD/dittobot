const { MessageEmbed } = require("discord.js"),
    { exec } = require("child_process")

module.exports = {
    name: "shell",
    aliases: ["sh", "셀", "노디ㅣ", "tpf"],
    category: "owner",
    run: async (client, message, args) => {
        if (!args.join(" ")) return

        exec(args.join(" "), (err, stdout, stderr) => {
            if (err) message.channel.send(new MessageEmbed().setTitle("Shell").setColor(0xff0000).setDescription(`**📥 Input: **\n\`\`\`sh\n${args.join(" ")}\n\`\`\`\n**📤 Output: **\n\`\`\`sh\n${stderr.length > 1500 ? stderr.substr(0, 1500) : stderr}\n\`\`\``))
            else message.channel.send(new MessageEmbed().setTitle("Shell").setColor(0x00ff00).setDescription(`**📥 Input: **\n\`\`\`sh\n${args.join(" ")}\n\`\`\`\n**📤 Output: **\n\`\`\`sh\n${stdout.length > 1500 ? stdout.substr(0, 1500) : stdout}\n\`\`\``))
        })
    }
}