const { ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: "embed",
    description: "Permet de créer un embed",
    usage: "/embed",
    example: "/embed",
    category: "🔨 Modération",
    permissions: ["ManageMessages"],
    async execute(client, interaction) {
		const modal = new ModalBuilder()
			.setCustomId('embed')
			.setTitle('Processus d\'un création d\'un embed');

        const message = new TextInputBuilder()
			.setCustomId('message')
			.setLabel("Message avant l'embed (Non obligatoire)")
			.setStyle(TextInputStyle.Paragraph)
            .setRequired(false);    
    
		const title = new TextInputBuilder()
			.setCustomId('title')
			.setLabel("Titre de l'embed")
			.setStyle(TextInputStyle.Short)
            .setRequired(true);

		const description = new TextInputBuilder()
			.setCustomId('description')
			.setLabel("Description de l'embed")
			.setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const footer = new TextInputBuilder()
			.setCustomId('footer')
			.setLabel("Footer de l'embed (Non obligatoire)")
			.setStyle(TextInputStyle.Short)
            .setRequired(false);

		const premierModalBuilder = new ActionRowBuilder().addComponents(title);
		const secondModalBuilder = new ActionRowBuilder().addComponents(description);
        const threeModalBuilder = new ActionRowBuilder().addComponents(footer);
        const fourModalBuilder = new ActionRowBuilder().addComponents(message);

		modal.addComponents(fourModalBuilder, premierModalBuilder, secondModalBuilder, threeModalBuilder)
		await interaction.showModal(modal)
    }
}