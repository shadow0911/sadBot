const Discord = require('discord.js');
const client = new Discord.Client({disableMentions: 'everyone' });
require('dotenv').config();
const fs = require('fs');
const { Guild } = require('./models')

require('./Functions/functions')(client)
client.config = require('./config.json')
client.mongoose = require('./Functions/mongo')

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});


fs.readdir('./events/', (err, files) => { // use the method readdir to read what is in the events folder
    if (err) return console.error(err); // If there is an error during the process to read all contents of the ./events folder, throw an error in the console
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`); // Here we require the event file of the events folder
        if (eventFunction.disabled) return; // Check if the eventFunction is disabled. If yes return without any error

        const event = eventFunction.event || file.split('.')[0]; // Get the exact name of the event from the eventFunction variable. If it's not given, the code just uses the name of the file as name of the event
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client; // Here we define our emitter. This is in our case the client (the bot)
        const once = eventFunction.once; // A simple variable which returns if the event should run once

        // Try catch block to throw an error if the code in try{} doesn't work
        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args)); // Run the event using the above defined emitter (client)
        } catch (error) {
            console.error(error.stack); // If there is an error, console log the error stack message
        }
    });
});

fs.readdir("./clientEvents/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./clientEvents/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Loaded event '${eventName}'`)
    client.on(eventName, event.bind(null, client));
  });
});

const muteData = require('./clientEvents/checkMuteDatabase');
const welcome = require('./clientEvents/welcome');
const banDetection = require('./clientEvents/banDetection');
const kickDetection = require('./clientEvents/kickDetection');
const guildConfig = require('./clientEvents/guildCreate');
const AfkTimeout = require('./clientEvents/afkTimeout');
const { config } = require('process');
client.on('ready', async() => {
  client.user.setActivity("😟Recording a video for sabbir")
  console.log(`working in sabbir official sad😔`)
  muteData(client)
  banDetection(client)
  welcome(client)
  kickDetection(client)
  guildConfig(client)
  AfkTimeout(client)
})

client.on('message', async message =>{
  let settings = await Guild.findOne({guildID: message.guild.id})

  const prefix = settings ? settings.prefix : config.default_prefix
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
client.mongoose.init();
client.login(process.env.TOKEN)