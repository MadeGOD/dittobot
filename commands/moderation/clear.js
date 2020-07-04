module.exports = {
    name: "clear",
    aliases: ["삭제", "청소", "delete", "칟ㅁㄱ", "ㅇ딛ㅅㄷ", "tkrwp", "cjdth", "지워", "wldnj", "clean", "칟무", "클린"],
    category: "moderation",
    usage: "{prefix}삭제 <수>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete()
    
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('메세지 관리 권한이 필요합니다.')
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply(`❌ ${client.user.username}의 권한에 **메세지 관리 권한**이 필요합니다.`)
    
        if (isNaN(args[0]) || parseInt(args[0]) <= 0 || args.join(" ").includes(".")) return message.reply("자연수를 입력해 주세요.")

        let deleteAmount
    
        if (parseInt(args[0]) > 100) deleteAmount = 100
        else deleteAmount = parseInt(args[0])
    
        message.channel.bulkDelete(deleteAmount, true).then(deleted => message.channel.send(`\`${deleted.size}\`개의 메세지를 삭제하였습니다.`)).then(m => m.delete({ timeout: 5000 })).catch(err => message.channel.send(`알 수 없는 오류가 발생했습니다.\n${err}`))
    }
}