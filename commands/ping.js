const { Client, EmbedBuilder, PermissionFlagsBits,PermissionsBitField } = require("discord.js");
const db = require('../db')
const {AdvancedEmbed, AdvancedEmbedType} = require('utilscord')
module.exports = {
  name: "ping",
  description: 'Bot sana ping değerlerini gösterir.',
  type: 1,
  options: [],

  run: async(client, interaction) => {
    
    const date = Date.now()
    const embed = new AdvancedEmbed()
    .setDescription(`> Discord API: **${client.ws.ping} ms**\n Mesaj Gecikmesi: **${Date.now - date || "Belirlenemeyen"} ms**`)
    interaction.reply({embeds:[embed]})

  }
}; 