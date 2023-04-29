const ticketData = require('../../models/ticketData')
const { Success } = require('../../utils/Success')
const { ChannelType, ComponentType, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { Error } = require('../../utils/Error')
const ms = require('ms')

module.exports = {
    customId: "close-ticket",
    async execute(client, interaction) {
        const { guildId, guild } = interaction;

        const data = await ticketData.findOne({ Guild: guildId })

        if(!data) return Error(interaction, "Il n'y a pas de données de ticket qui a été trouvé, veuillez contacter le staff !")

        await interaction.reply({ embeds: [
            new EmbedBuilder()
                .setTitle("Êtes vous sur de vouloir fermer le ticket ?")
                .setColor("Red")
                .setTimestamp()
        ], components: [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("yes-close")
                    .setStyle(ButtonStyle.Success)
                    .setLabel("Oui"),

                new ButtonBuilder()
                    .setCustomId("no-close")
                    .setStyle(ButtonStyle.Danger)
                    .setLabel("Non")
            )
        ] })

    }
}