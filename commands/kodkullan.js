const { Client, EmbedBuilder, PermissionFlagsBits, PermissionsBitField, WebhookClient, time } = require("discord.js");
const db = require('../db')
const config = require('../config.json')
const { v4: uuidv4 } = require('uuid');
const { AdvancedEmbed, EmbedStyle } = require('utilscord')
module.exports = {
    name: "kod-kullan",
    description: 'Kod kullanmana ve premium aktifleştirmene yarar.',
    type: 1,
    options: [{ name: 'anahtar-kodu', description: 'Lütfen size verilen kodu girin.', type: 3, required: true }],
    /** @param {import("discord.js").ChatInputCommandInteraction} interaction */
    run: async (client, interaction) => {
        const optionKey = interaction.options.getString('anahtar-kodu')
        const unpush = (key, value) => db.set(key, db.get(key).filter(data => data !== value));
        const keys = db.get('kodlar')
        const n = `premium_${interaction.user.id}`
        const m = db.get(n)
        let date = new Date();
        let timeTR = date.toLocaleDateString("tr-TR", {"weekday": "long","month": "long","year": "numeric","day": "numeric"});

        if(db.has(n)) {
          const embed = new AdvancedEmbed()
          .setInteraction(interaction)
          .setDescription(`**${m}** tarihinde zaten bir premium **aktifleştirmissin**.`)
          .setStyle(EmbedStyle.Default)
          interaction.reply({embeds:[embed], ephemeral:true})
          return;
        }
        const x = keys.find(kod => kod === optionKey);
        if (x) {
        unpush('kodlar', optionKey)
        db.set(`premium_${interaction.user.id}`, timeTR)
        db.set(`kullanıldı_${optionKey}`, {
          kullanan: interaction.user.id,
          zaman: timeTR
        })
        const embed = new AdvancedEmbed()
        .setInteraction(interaction)
        .setDescription(`Tebrikler, premium aktifleştirdin.`)
        .setStyle(EmbedStyle.Success)
        interaction.reply({embeds:[embed], ephemeral:true})

        const webhook = new WebhookClient({ url: config.ayarlar.LogWebhookUrl });
        const webEmbed = new AdvancedEmbed()
        .setInteraction(interaction)
        .setDescription(`<@${interaction.user.id}> az önce bir kod kullandı ve premium aktifleştirdi. İyi günlerde kullanmasını diliyoruz 🥰`)
        .setStyle(EmbedStyle.Default)
        webhook.send({embeds:[webEmbed]})
        return;
        } else {
          if(db.has(`kullanıldı_${optionKey}`)){
            const kullanan = db.get(`kullanıldı_${optionKey}`).kullanan
            const zaman = db.get(`kullanıldı_${optionKey}`).zaman
            const embed = new AdvancedEmbed()
            .setInteraction(interaction)
            .setDescription(`Maalesef, bu kod senden daha önce <@${kullanan}> tarafından **${zaman}** tarihinde kullanılmış.`)
            .setStyle(EmbedStyle.Error)
            interaction.reply({embeds:[embed], ephemeral:true})
            return;
          }
          const embed = new AdvancedEmbed()
          .setInteraction(interaction)
          .setDescription(`Lütfen geçerli bir kod kullanın.`)
          .setStyle(EmbedStyle.Error)
          interaction.reply({embeds:[embed], ephemeral:true})
          return;
        }
   

    }
}; 