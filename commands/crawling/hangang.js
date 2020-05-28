const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "hangang",
    aliases: ["한강온도", "한강수온", "한강", "gkssrkd"],
    category: "crawling",
    run: async (client, message, args, ops) => {
        const { temp, time } = await require("node-fetch")("http://hangang.dkserver.wo.tc/").then(e => e.json());

        message.channel.send(new MessageEmbed().setTitle("한강의 수온").setColor(0x00ff00).setTimestamp().setDescription(`**${temp}℃**`).setFooter(`${ops.formatTime(time)} 기준`))
    }
}