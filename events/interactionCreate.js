const { Collection, EmbedBuilder, codeBlock } = require("discord.js");
const Discord = require("discord.js")
const croxy = require("croxydb");
const { readdirSync } = require("fs");
module.exports = async(client, interaction) => {

  if (!interaction.guild) return;
  
  const { user, customId, guild } = interaction;

  if(interaction.isChatInputCommand()) {
    if (!interaction.guildId) return;
    readdirSync('./commands').forEach(f => {
      const cmd = require(`../commands/${f}`);
      if(interaction.commandName.toLowerCase() === cmd.name.toLowerCase()) {
        return cmd.run(client, interaction, croxy);
      }
});
}
  }
