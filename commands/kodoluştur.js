const { Client, EmbedBuilder, PermissionFlagsBits, PermissionsBitField, WebhookClient } = require("discord.js");
const db = require('../db')
const config = require('../config.json')
const { v4: uuidv4 } = require('uuid');
const { AdvancedEmbed, EmbedStyle } = require('utilscord')
module.exports = {
  name: "kod-oluştur",
  description: 'Yeni bir tane kod oluşturur.',
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

    const webhook = new WebhookClient({ url: config.ayarlar.LogWebhookUrl });
    const key = uuidv4()

    db.push('kodlar', key)
    db.add('aktifKod', 1)
    const embed = new AdvancedEmbed()
      .setDescription(`> Kod oluşturuldu.`)
      .setInteraction(interaction)
      .setStyle(EmbedStyle.Success)
    interaction.reply({ embeds: [embed], ephemeral:true })

    const webEmbd = new AdvancedEmbed()
      .setDescription(`> ${interaction.user.globalName || interaction.user.username} tarafından yeni bir kod oluşturuldu. Toplam geçerli kod: **${db.get(`aktifKod`) || "0"}**`)
      .setInteraction(interaction)
      .setStyle(EmbedStyle.Default)
    webhook.send({ embeds: [webEmbd] })
  }
}; 