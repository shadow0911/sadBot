const Discord = require('discord.js');
const client = new Discord.Client();
const { readdirSync } = require("fs");

const ascii = require("ascii-table"); // - npm i ascii-table required*

let table = new ascii("Commands"); // Put any name
table.setHeading("Command", "Load status"); // You can change, but this one is better

module.exports = client => {

  readdirSync("./commands/").forEach(dir => { // Locate your folder that has all the commands

    const commands = readdirSync(`./commands/${dir}/`).filter(file =>
      file.endsWith(".js")
    );
    for (let file of commands) {
      let pull = require(`../commands/${dir}/${file}`);

      if (pull.name) {
        client.commands.set(pull.name, pull);
        table.addRow(file, "✅");
      } else {
        table.addRow(
          file,
          `❌  -> missing a help.name, or help.name is not a string.`
        );
        continue;
      }

      // If there's an aliases key, read the aliases.
      if (pull.aliases && Array.isArray(pull.aliases))
      pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
    }
  });
  // Log the table
  console.log(table.toString());
};