const { EmbedBuilder } = require('discord.js')
const ticketInfos = require('../../models/ticket')

module.exports = {
    customId: "delete-ticket",
    async execute(client, interaction) {
        const data = await ticketInfos.findOne({ Guild: interaction.guildId, channelId: interaction.channel.id })
        
        if(!data) return interaction.channel.delete()

        const user = await interaction.guild.members.fetch(data.memberId)

        try {
            user.send({ embeds: [
                new EmbedBuilder()
                    .setTitle("Fermeture de ticket")
                    .setDescription(`Votre ticket sur le serveur **${interaction.guild.name}** a été supprimé par **${interaction.user.username}** !`)
                    .setColor(client.color)
            ] })
        } catch(err) {

        }

        data.delete();

        return interaction.channel.delete()
    }
}