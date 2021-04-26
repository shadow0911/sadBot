const { MessageEmbed } = require('discord.js')
const { customCommand, Guild} = require('../models')

module.exports = {
    event: "message",
    once: false,
    run: async(message)=> {

        let settings = await Guild.findOne({guildID: message.guild.id})
        const prefix = settings ? settings.prefix : config.default_prefix

        let contentValue = message.content.split(" ")[0]
        let keyValue = contentValue.slice(prefix.length)

        let Member = message.guild.member(message.mentions.users.last())

        const data = await customCommand.findOne({
            guildID: message.guild.id,
            key: keyValue,
            Active: false
        })
        if(!message.content.startsWith(prefix)){
            return
        }

        function memberReplace(Array) {
            return Array
            .toString().replace("${message.author}", `${message.author}`)
            .toString().replace("${message.author.id}", `${message.author.id}`)
            .toString().replace("${message.author.tag}", `${message.author.tag}`)
            .toString().replace("${message.author.username}", `${message.author.username}`)
            .toString().replace("${member.user}", `${Member}`)
            .toString().replace("${member.user.id}", `${Member.id}`)
            .toString().replace("${member.user.tag}", `${Member.user.tag}`)
            .toString().replace("${member.user.username}", `${Member.username}`)
            .toString().replace("${message.channel}", `${message.channel}`)
            .toString().replace("${message.channel.name}", `${message.channel.name}`)
            .toString().replace("${message.channel.id}", `${message.channel.id}`)
            .toString().replace("${message.guild.name}", `${message.guild.name}`)
            .toString().replace("${message.guild.id}", `${message.guild.id}`)
        }

        function publicReplace(Array) {
            return Array
            .toString().replace("${message.author}", `${message.author}`)
            .toString().replace("${message.author.id}", `${message.author.id}`)
            .toString().replace("${message.author.tag}", `${message.author.tag}`)
            .toString().replace("${message.author.username}", `${message.author.username}`)
            .toString().replace("${message.channel}", `${message.channel}`)
            .toString().replace("${message.channel.name}", `${message.channel.name}`)
            .toString().replace("${message.channel.id}", `${message.channel.id}`)
            .toString().replace("${message.guild.name}", `${message.guild.name}`)
            .toString().replace("${message.guild.id}", `${message.guild.id}`)
        }
        
        const Embed = new MessageEmbed()
        
        if(!data){
            return false
        }else if(data){
            let roleSet = data.rolesID;
            let { cache } = message.guild.roles;
            let msg = data.content.split(',').join(" ");
            
            if(message.member.roles.cache.some(r=>roleSet.includes(r.id))){

                if(data.deleteKey == true){
                    await message.delete()
                }
                if(data.Mention == true){
                    if(!Member){
                        return
                    }else if(Member){
                        if(data.Embed == true){
                            if(data.content){
                                Embed.setDescription(memberReplace(`${msg}`))
                            }
                            if(data.image){
                                Embed.setImage(data.image)
                            }
                            if(data.Author){
                                Embed.setAuthor(memberReplace(`${data.Author.split(',').join(" ")}`))
                            }
                            if(data.Title){
                                Embed.setTitle(memberReplace(`${data.Title.split(',').join(" ")}`))
                            }
                            if(data.Title && data.URL){
                                Embed.setURL(data.URL)
                            }
                            if(data.color){
                                Embed.setColor(data.color ? data.color : message.guild.me.displayColor)
                            }
                            if(data.Footer){
                                Embed.setFooter(memberReplace(`${data.Footer.split(',').join(" ")}`))
                            }
                            if(data.TimeStamp){
                                if(data.TimeStamp == true){
                                    Embed.setTimestamp()
                                }
                            }

                            message.channel.send(Embed).catch(err => console.log(err))
                        }else {
                            message.channel.send(memberReplace(`${msg}`)).catch(err => console.log(err))
                        }
                    }
                }else if(data.Mention == false){
                    if(data.Embed == true){
                        if(data.content){
                            Embed.setDescription(publicReplace(`${msg}`))
                        }
                        if(data.image){
                            Embed.setImage(data.image)
                        }
                        if(data.Author){
                            Embed.setAuthor(publicReplace(`${data.Author.split(',').join(" ")}`))
                        }
                        if(data.Title){
                            Embed.setTitle(publicReplace(`${data.Title.split(',').join(" ")}`))
                        }
                        if(data.Title && data.URL){
                            Embed.setURL(data.URL)
                        }
                        if(data.color){
                            Embed.setColor(data.color)
                        }else if(!data.color){
                            Embed.setColor(message.guild.me.displayColor)
                        }
                        if(data.Footer){
                            Embed.setFooter(publicReplace(`${data.Footer.split(',').join(" ")}`))
                        }
                        if(data.TimeStamp){
                            if(data.TimeStamp == true){
                                Embed.setTimestamp()
                            }
                        }
    
                        message.channel.send(Embed).catch(err => console.log(err))
                    }else {
                        message.channel.send(publicReplace(`${msg}`)).catch(err => console.log(err))
                    }
                };
                
            }else {
                return false;
            }
            
        }
    }
}