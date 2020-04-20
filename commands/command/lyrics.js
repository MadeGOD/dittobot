const Lyrics = require("slyrics");
const lyrics = new Lyrics();
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'lyrics',
    aliases: ['가사검색', 'lyric', '가사'],
    category: "command",
    run: async (client, message, args, tools) => {
        if (!args[0]) return message.channel.send('가사를 검색할 노래 이름을 입력해 주세요!');

        const result = await lyrics.get('melon', args.join(' '));

        if (result.error) return message.channel.send(`\`${args.join(" ")}\`의 가사를 찾을 수 없습니다.`);
        else {
            const embed = new MessageEmbed().setTitle(`${result.artist} - ${result.title}`).setThumbnail(result.albumArt).setColor(0xffff00);
            
            if (result.result.toString().length < 1700) {
                embed.setDescription(`[🎵 바로가기](${result.url})\n\n${result.result.toString()}`);
                message.author.send(embed);
            } else {
                embed.setDescription(`[🎵 바로가기](${result.url})\n\n${result.result.toString().substr(0, 1650)}`);
                message.author.send(embed);
                message.author.send(new MessageEmbed().setColor(0xffff00).setDescription(`${result.result.toString().replace(result.result.toString().substr(0, 1650), '')}`));
            };
        };
    }
};