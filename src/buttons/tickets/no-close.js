module.exports = {
    customId: "no-close",
    async execute(client, interaction) {
        interaction.update({ content: "Chargement...", embeds: [], components: [] })
        interaction.deleteReply()
    }
}