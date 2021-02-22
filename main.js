const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const fs = require('fs');


require('./Functions/functions')(client)
const mongo = require('./Functions/mongo')

client.config = require('./config.json')

let prefix = '>';

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

let bannedWords = ['fuck', 'bitch', 'die', 'shit', 'dick', 'asshole', 'D I E', 'f u c k', 'fck', 'shit', 'sh*t', 'cum', 'b*tch', 'f*ck', 'fu*k','sex']


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Loaded event '${eventName}'`)
    client.on(eventName, event.bind(null, client));
  });
});


client.on('ready', async() => {
  client.user.setActivity("😟Recording a video for sabbir")
  console.log(`working in sabbir official sad😔`)

  })

client.on('message', async message =>{
  let userStatus = JSON.parse(fs.readFileSync("./status.json", "utf8"))

  let words = message.content.toLowerCase().trim().match(/\w+|\s+|[^\s\w]+/g);
  let containsBadWord = words.some(word => {
    return bannedWords.includes(word);
  });
  if (containsBadWord) {
    if(message.member.permissions.has('ADMINISTRATOR')){
      return
    }else{
      message.delete();
      message.reply("watch your language").then(m => m.delete({timeout: 5000}))
    }

    message.guild.channels.cache.get('777068832946257922').send({embed: new Discord.MessageEmbed()
      .setAuthor('Bad word detection',`${message.author.avatarURL({
          dynamic: true , format: 'png'
      }
      )}`)
      .addField('Message:', `${message.content}`, true)
      .addField('Channel:', `${message.channel}`, true)
      .addField('Author:', `${message.author}`, true)
      .setTimestamp()
      .setColor('FF0000')
    })
  }
  
  if(!message.content.startsWith(prefix)) return
  if(!prefix) return

  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

    if (!message.member)
      message.member = await message.guild.fetchMember(message);
    let args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args,prefix);
})

client.login(process.env.TOKEN)