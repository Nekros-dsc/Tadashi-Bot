const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const weather = require('weather-js')
const translate = require('@iamtraction/google-translate')

module.exports = {
    name: "weather",
    description: "Permet d'afficher la météo d'une ville",
    usage: "/weather `[ville: ville]`",
    example: "/weather `[ville: paris]`",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    options: [
        {
            name: "ville",
            description: "Ville",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async execute(client, interaction) {
        const city = interaction.options.getString("ville")

        const Replied = await interaction.reply({ content: "Chargement...", fetchReply: true })

        weather.find({search: city, degreeType: "C"}, async function(error, result) {
            const errorembed = new EmbedBuilder()
                .setDescription("❌ La ville que vous avez indiqué est invalide !")
                .setColor("Red")

            if(result === undefined || result.length === 0) return Replied.edit({ content: null, embeds: [errorembed], ephemeral: true })

            let current = result[0].current;

            const skyText = await translate(current.skytext, { to: 'fr' })

            const embed = new EmbedBuilder()
                .setThumbnail(current.imageUrl)
                .setAuthor({ name: `Température trouvé pour ${city} (${current.observationpoint})` })
                .addFields(
                    { name: "Ville", value: `\`${current.observationpoint}\``, inline: true },
                    { name: "Temps", value: `\`${skyText.text}\``, inline: true },
                    { name: "Température", value: `\`${current.temperature}°C\``, inline: true },
                    { name: "Température ressenti", value: `\`${current.feelslike}°C\``, inline: true },
                    { name: "Vent", value: `\`${current.winddisplay}\``, inline: true },
                    { name: "Humidité", value: `\`${current.humidity}%\``, inline: true },
                )
                .setColor("Random")

            Replied.edit({ content: null, embeds: [embed] })
        })
    }
};