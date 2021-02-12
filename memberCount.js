// module.exports = (client) => {
//    const channelId = '771987308797755412'
 
//    const updateMembers = (guild) => {
//     const channel = guild.channels.cache.get(channelId)
//     channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
//    }
 
//    client.on('guildMemberAdd', (member) => updateMembers(member.guild))
//    client.on('guildMemberRemove', (member) => updateMembers(member.guild))
 
//    const guild = client.guilds.cache.get("617358352468541440")
//    updateMembers(guild)
//  }