const { Client, EmbedBuilder, PermissionFlagsBits, PermissionsBitField, WebhookClient } = require("discord.js");
const db = require('../db')
const config = require('../config.json')
const { v4: uuidv4 } = require('uuid');
const { AdvancedEmbed, EmbedStyle } = require('utilscord')
module.exports = {
  name: "kodlar",
  description: 'Kullanıcılara dağıtılabilecek geçerli kodları görürsün.',
  type: 1,
  options: [],
  /** @param {import("discord.js").ChatInputCommandInteraction} interaction */
  run: async (client, interaction) => {

    if(interaction.user.id !== config.SahipId) {
        const embed = new AdvancedEmbed()
        .setInteraction(interaction)
        .setStyle(EmbedStyle.Default)
        .setDescription('Bu komutu sadece bot sahibi kullanabilir.')
        interaction.reply({embeds:[embed], ephemeral:true, fetchReply: true})
        return;
      }
      
      if(!db.has('kodlar')) {
        const embed = new AdvancedEmbed()
        .setDescription(`> Geçerli kodlar: **Henüz hiç yok.**`)
        .setInteraction(interaction)
        .setStyle(EmbedStyle.Success)
      interaction.reply({ embeds: [embed], ephemeral:true })
      return;
      }

      const y = db.get('kodlar').join(`\n`)
    const embed = new AdvancedEmbed()
      .setDescription(`> Geçerli kodlar:
       ${y}`)
      .setInteraction(interaction)
      .setStyle(EmbedStyle.Default)
    interaction.reply({ embeds: [embed], ephemeral:true })
  }
}; 