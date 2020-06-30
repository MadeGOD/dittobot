require("dotenv").config()

const { ShardingManager } = require("discord.js"),
    manager = new ShardingManager("./bot.js")

manager.spawn()
manager.on("shardCreate", shard => console.log(`Create shard ${shard.id}`))