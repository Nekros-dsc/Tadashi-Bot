const { PermissionsBitField } = require('discord.js')
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
    name: "unlock",
    description: "Déverrouille un salon",
    permissions: ["ManageChannels"],
    usage: "/unlock",
    example: "/unlock",
    category: "🔨 Modération",
    async execute(client, interaction) {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true })

        Success(interaction, `Le salon est déverrouillé !`)
    }
}