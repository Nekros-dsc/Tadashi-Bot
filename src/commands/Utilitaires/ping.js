const {  EmbedBuilder, ActionRowBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle } = require("discord.js");

const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("reload-ping")
            .setEmoji("🎯")
            .setLabel("Actualiser")
            .setStyle(ButtonStyle.Success)
    )

module.exports = {
    name: "ping",
    description: "Affiche le ping du bot",
    usage: "/ping",
    example: "/ping",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    async execute(client, interaction) {
        const tryPong = await interaction.reply({ content: "Calcul du ping... Un instant !", fetchReply: true });
    
        const embed = new EmbedBuilder()
            .setTitle(`Latence du bot \`${client.user.username}\``)
            .setDescription(
                `
                > **\`•\` Latence du bot :** ${tryPong.createdTimestamp - interaction.createdTimestamp}ms
                > **\`•\` Latence de la communication de discord et du bot (API) :** ${client.ws.ping}ms
                > **\`•\` Localisation du serveur :** Qu'est-ce que j'en sais :/
                `
            )
            .setAuthor({ name: "Latence du bot", iconURL: `${client.user.displayAvatarURL()}` })
            .setTimestamp()
            .setColor(client.color)

        tryPong.edit({ content: null, embeds: [embed], components: [button] });
    }
};