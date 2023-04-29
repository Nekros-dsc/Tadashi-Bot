const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js')

module.exports = {
    customId: "yes-close",
    async execute(client, interaction) {
        interaction.channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true, SendMessages: false });

        interaction.update({ embeds: [
            new EmbedBuilder()
                .setDescription("Ticket fermé avec succès.")
                .setColor(client.color)
        ], components: [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("delete-ticket")
                    .setLabel("Supprimer le ticket")
                    .setStyle(ButtonStyle.Danger)
            )

        ] })
    }
}