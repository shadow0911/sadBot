const Discord = require('discord.js')
const fs = require('fs')
module.exports = {
    name: 'adminembed',
    description:'cleans an amount of chat',
    category: 'moderation',
    usage:'clean 100',
    run: async(client, message, args,prefix) =>{
        let Embed = new Discord.MessageEmbed()
        .setAuthor('Frequently asked questions', message.guild.iconURL({dynamic: true, type: 'gif'}))
        .addField('Where is Sabbir?',"Sabbir usually offline at morning. He is online at night most of the time. If he is not online, then he is busy in real life.",)
        .addField("Can i ping sabbir?", "Sabbir is a busy person. He probably Recording or editing a new video. You are disturbing him on his work by pinging him. If you are so desperate and want to ping him, then please provide a valid reason when you ping him. But <#711541183242960906> you are allowed to ping Sabbir and bring Sabbir in chat.")
        .addField("Where is the minecraft server?", "Sabbir decided to shutdown his server. We will announce if Sabbir decided to host another server. Make sure to follow <#742018846424301622>.")
        .addField("Can i play/talk with Sabbir?", "You can play or chat with Sabbir when he wants to chat with fans. He will come to chat or will just ask people to join vc if he wants to talk in voice chat. Or else you can nitro boost us and chat with Sabbir in <#711541183242960906> anytime.")
        .addField("How do i join Fan-Recording?","If Sabbir do a fan record we will ping everyone. Sabbir will ask everyone to join voice and he will pick fans from there for Fan-Record.")
        .setColor(message.guild.me.displayColor)
        message.channel.send(Embed)
    }
}

// .setDescription("Hello everyone This is SadBot. If you're new to this server, i warmly welcome you. Make sure to read the rules and follow them before you start chatting <:meow_uwu:684670579797786638>")
// .addField('Rules 1', "First and foremost, we require that everyone here abide to the Discord Terms of Service and Guidelines at https://discord.com/terms and https://discord.com/guidelines, which means if you are under 13 years old we respectfully ask you to leave. If you don't do that, we have to ban you from the server.")
// .addField('Rules 2', "English or Bangla language only. We don't talk in any language that isn't understandable by any user of this community. So please use Bangla/English to communicate with each other.")
// .addField('Rules 3', "Please don't ping Sabbir or his friends for no reason. If you're so desperate and you want to ping Sabbir then please provide a valid reason for pinging him.")
// .addField('Rules 4', "Use common sense - don't spam chats, don't do anything inappropriate. Keep chat clean and always listen to mods what they are saying")
// .addField('Rules 5', "No harassment, bullying, doxing, discrimination of any kind. No racism/sexism. This is not be tolerated and will result in a ban.")
// .addField('Rules 6', "No NSFW. Do not post anything NSFW in ANY channels. Do not talk about ANY kind of NSFW.")
// .addField('Rules 7', "Do NOT **advertise** in any of the server members dms or in text channels. This includes asking for sub or asking for to join server. This will not be tolerated and action will be taken.")
// .addField('Rules 8', "We want to keep this server as PG as possible, so please refrain from swearing or adult discussion.")
// .addField('Rules 9', "Use chats for their purpose - each channel has its own use, please only use it for it's desired purpose.")
// .addField('Rules 10', "Please refrain from trolling, spreading negativity or fake news and posting invite links in any channel.")
// .addField('Rules 11', "Please don't be disrespectful to any member of this server or any of the staff. This will not be tolerated and action will be taken.")
// .addField('Rules 12', "Please don't ask for roles that includes asking for Mod/Admin. If you want to see server ranks, visit <#619512356787191828>")
// .addField('Rules 13', "No ALT (alternative) accounts not allowed. If you have alt account in this server, we respectfully ask you to leave server from alt. If we find out about your alt, this will end up with Ban on both account.")