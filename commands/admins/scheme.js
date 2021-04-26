const { customCommand } = require('../../models')
const { MessageCollector, MessageEmbed } = require('discord.js');
const { set } = require('mongoose');
module.exports = {
    name: 'scheme',

    run: async(client, message, args,prefix) =>{
        message.channel.send('started...')

        const filter = async (m) => {
            return m.content.toLowerCase() && m.author.id == message.author.id
        };
        const collector = message.channel.createMessageCollector(filter, {max: 1});

        function object(data){
            obj = {
                key: data
            }
        }
        const Embed = new MessageEmbed()

        function variables(Array) {
            return Array
            .toString().replace("{author}", '${message.author}')
            .toString().replace("{author.id}", '${message.author.id}')
            .toString().replace("{author.tag}", '${message.author.tag}')
            .toString().replace("{author.name}", '${message.author.username}')
            .toString().replace("{user}", '${member.user}')
            .toString().replace("{user.id}", '${member.user.id}')
            .toString().replace("{user.tag}", '${member.user.tag}')
            .toString().replace("{user.name}", '${member.user.username}')
            .toString().replace("{channel}", '${message.channel}')
            .toString().replace("{channel.name}", '${message.channel.name}')
            .toString().replace("{channel.id}", '${message.channel.id}')
            .toString().replace("{server}", '${message.guild.name}')
            .toString().replace("{server.id}", '${message.guild.id')
            .toString().replace(/^\s+|\s+$/g,'')
        }
        collector.on('collect', async(collected) =>{
            await Embed.addField('KEY', collected.content)
            object(collected.content)
            console.log(obj)
            message.channel.send(Embed)
        })

    }
}