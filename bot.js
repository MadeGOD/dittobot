const { Client, Collection, MessageEmbed } = require("discord.js"),
	{ readdirSync } = require("fs"),
	chalk = require("chalk"),
	koreanbots = require("koreanbots"),
	table = (new(require("ascii-table"))).setHeading("Command", "Status"),
	Bot = new koreanbots.MyBot(process.env.KOREANBOTS_TOKEN),
	client = new Client();

client.login();

client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.categories = readdirSync("./commands/");

readdirSync("./commands/").forEach(dir => {
	for (let file of readdirSync(`./commands/${dir}`).filter(f => f.endsWith(".js"))) {
		let pull = require(`./commands/${dir}/${file}`);

		if (pull.name) {
			client.commands.set(pull.name, pull);
			table.addRow(file, "✅")
		} else {
			table.addRow(file, "❌")
		}

		if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(a => client.aliases.set(a, pull.name))
	}
});

client.on("ready", () => {
	console.log(`${table.toString()}\nLogin ${client.user.username}\n----------------------------`);

	const activity = [`${client.guilds.cache.size}개의 서버`, `${client.users.cache.filter(e => !e.bot).size}명의 유저`, `${client.guilds.cache.size} guilds`, `${client.users.cache.filter(e => !e.bot).size} users`, `https://is.gd/dittoBot`];

	setInterval(() => {
		client.user.setActivity(activity[Math.floor(Math.random() * activity.length)])
	}, 10000);

	client.musicManager = new(require("./structures/MusicManager"))(client);

	Bot.update(client.guilds.cache.size).catch(e => console.log(e.message))
})
.on("message", async message => {
	if (message.author.bot || message.system || !message.content.startsWith(process.env.PREFIX)) return;

	if (message.channel.type === "dm" && (message.author.id !== process.env.OWNER_ID)) {
		message.channel.send(`DM에서는 ${client.user.username}을(를) 사용하실 수 없습니다.\n${client.user.username}이(가) 있는 서버에서 사용해 주세요.`);
		return console.log(`${chalk.green("DM Message")} ${message.author.username} (${message.author.id}): ${message.content}`)
	}

	if (message.channel.type === "text" && (message.author.id !== process.env.OWNER_ID)) console.log(`${chalk.yellow("Message")} ${message.author.username} (${message.author.id}): ${message.content} | GUILD: ${message.guild.name} (${message.guild.id}) | CHANNEL: ${message.channel.name} (${message.channel.id})`);

	if (message.channel.type === "text" && !message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send(`${client.user.username}을(를) 원활하게 이용하실려면 **EMBED_LINKS**(링크 보내기) 권한이 필요합니다!`)

	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g),
		cmd = args.shift().toLowerCase(),
		command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

	try {
		const ops = {
			ownerID: process.env.OWNER_ID,
			prefix: process.env.PREFIX,
			formatTime: time => {
				const date = new Date(time);
				return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours() + 1}시 ${date.getMinutes() + 1}분 ${date.getSeconds() + 1}초`
			},
			getMember: (msg, mem) => {
				let member = msg.guild.members.cache.get(mem);

				if (!member && msg.mentions.members) member = msg.mentions.members.first();
				if (!member && mem) member = msg.guild.members.cache.find(m => m.displayName.toLowerCase().includes(mem) || m.user.username.toLowerCase().includes(mem) || m.user.tag.toLowerCase().includes(mem));
				if (!member) member = msg.member;

				return member
			},
			getChannel: (msg, ch) => {
				let channel = msg.guild.channels.cache.get(ch);

				if (!channel && msg.mentions.channels) channel = msg.mentions.channels.first();
				if (!channel && ch) channel = msg.guild.channels.cache.find(m => m.name.toLowerCase().includes(ch));
				if (!channel) channel = msg.channel;

				return channel
			},
			embed: {
				musicError1: new MessageEmbed().setColor(0xFF0000).setTitle(`❌ 현재 재생 중인 음악이 없어요!`),
				musicError2: new MessageEmbed().setColor(0xFF0000).setTitle(`❌ 음성 채널에 먼저 들어가 주세요!`),
				musicError3: name => new MessageEmbed().setColor(0xFF0000).setDescription(`❌ **${name}** 채널로 들어가 주세요!`)
			}
		};

		if (command) {
			if (command.category === "owner" && (message.author.id !== process.env.OWNER_ID)) return message.channel.send(`\`${client.user.username} 개발자\`만 가능합니다.`);
			command.run(client, message, args, ops)
		} else {
			require("node-fetch")(`https://builder.pingpong.us/api/builder/${process.env.pingpong}/integration/v0.2/custom/${message.author.id}`, {
				method: "POST",
				headers: {
					"Authorization": `Basic ${process.env.Authorization}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					request: {
						query: cmd
					}
				})
			}).then(r => r.json()).then(({ response: { replies: [{ text }] } }) => message.channel.send(text))
		}
	} catch(e) {
		console.error
	}
})
.on("guildCreate", guild => console.log(`${chalk.blue("Guild Create")} name: ${guild.name} (${guild.id}), owner: ${guild.owner.user.tag} (${guild.ownerID})`))
.on("guildDelete", guild => console.log(`${chalk.red("Guild Delete")} name: ${guild.name} (${guild.id}), onwer: ${guild.owner.user.tag} (${guild.ownerID})`))
.on("rateLimit", rateLimit => console.log(`${chalk.blueBright("RateLimit")} limit: ${rateLimit.limit}, timeout: ${rateLimit.timeout}, method: ${rateLimit.method}, route: ${rateLimit.route}`))
.on("error", console.error)
.on("warn", console.warn);

process.on("unhandledRejection", console.error).on("uncaughtException", console.error).on("warning", console.warn);