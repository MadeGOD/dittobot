const fetch = require("node-fetch")

module.exports = {
    name: "blow",
    aliases: ["ㅠㅣㅐㅈ", "blow.ga", "ㅠㅣㅐㅈ.ㅎㅁ"],
    category: "command",
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("단축할 URL을 입력해 주세요!")

        const res = await fetch("https://blow.ga/api/new", {
            method: "POST",
            body: JSON.stringify({
                url: args[0],
                custom: args[1] ? args[1] : null
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(e => e.text()).then(e => e)

        message.channel.send(res === "ERR" ? "Error" : `https://blow.ga/${res}`)
    }
}