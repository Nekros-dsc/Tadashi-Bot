const { ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    customId: "welcome-msg",
    async execute(client, interaction) {
        const modal = new ModalBuilder()
            .setCustomId('wlmsg')
            .setTitle('Message de bienvenue');

        const message = new TextInputBuilder()
            .setCustomId('wlcmmsg')
            .setLabel("Message")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);
            
        const first = new ActionRowBuilder().addComponents(message);

        modal.addComponents(first)
        await interaction.showModal(modal)
    }
}