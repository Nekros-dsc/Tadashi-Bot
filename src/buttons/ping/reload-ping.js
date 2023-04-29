const { EmbedBuilder } = require('discord.js')

module.exports = {
    customId: "reload-ping",
    async execute(client, interaction) {
        const embed = new EmbedBuilder()
            .setTitle(`Latence du bot \`${client.user.username}\``)
            .setDescription(
                `
                > **Latence de la communication de discord et du bot (API) :** ${client.ws.ping}ms
                > **Localisation du serveur :** États-Unis (Ashburn)
                `
            )
            .setTimestamp()
            .setColor(client.color)
            .setAuthor({ name: "Latence du bot", iconURL: `${client.user.displayAvatarURL()}` })

        interaction.update({ content: null, embeds: [embed] });
    }
}