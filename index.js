require("dotenv").config()

const manager = new(require('discord.js').ShardingManager)("./bot.js")

manager.spawn()
manager.on("shardCreate", shard => console.log(`Create shard ${shard.id}`))