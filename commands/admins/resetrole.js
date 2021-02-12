const Discord = require('discord.js');
module.exports = {
    name: 'reset-role',
    description:'reset Team sabbir role from everyone',
    category: 'Admin',
    usage:'clean 100',
    run: async(client, message, args,prefix) =>{
        if(!message.member.permissions.has("ADMINISTRATOR")){
            return
        }


        let Role = message.guild.roles.cache.find(r => r.name === "Team Sabbir")
        await Role.delete({reason: 'Role reset detection'})
            await message.guild.roles.create({
                data: {
                    name: 'Team Sabbir',
                    color: "#00ffca",
                    permissions: [],
                },
                reason: "SadBot role reset detection"
            })
        let TeamSabbir = message.guild.roles.cache.find(r => r.name === "Team Sabbir")

        let ReChat = message.guild.channels.cache.get('789517232161685524')
        await ReChat.overwritePermissions([
                {
                    id: TeamSabbir.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                }
            ]
        )
        await ReChat.updateOverwrite(message.guild.roles.everyone, 
            {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false
            }
        );
        let ManagerRole = message.guild.roles.cache.get('666432713472868354')
        await ReChat.updateOverwrite(ManagerRole, 
            {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                MANAGE_MESSAGES: true,
                MANAGE_PERMISSIONS: true
            }
        )

        let vcChat = message.guild.channels.cache.get('789517382707052545')
        await vcChat.overwritePermissions([
                {
                    id: TeamSabbir.id,
                    allow: ['VIEW_CHANNEL', 'CONNECT']
                }
            ]
        )
        await vcChat.updateOverwrite(message.guild.roles.everyone, 
            {
                VIEW_CHANNEL: false,
                CONNECT: false
            }
        );
        await vcChat.updateOverwrite(ManagerRole, 
            {
                VIEW_CHANNEL: true,
                CONNECT: true,
                MANAGE_PERMISSIONS: true
            }
        )

        await message.channel.send('Resets everyone from __Team Sabbir__')
    }
}