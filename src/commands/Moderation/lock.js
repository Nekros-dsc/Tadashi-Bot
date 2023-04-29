const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js')
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
    name: "lock",
    description: "Verrouille un salon",
    permissions: ["ManageChannels"],
    usage: "/lock",
    example: "/lock",
    category: "🔨 Modération",
    options: [
      {
        name: "reason",
        description: "Raison",
        type: ApplicationCommandOptionType.String,
        required: false
      }
    ],
    async execute(client, interaction) {
      await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false })
      Success(interaction, "Le salon est maintenant verrouiller avec succès !")

      const reason = interaction.options.getString("reason") || "Aucune raison";

      const channel = await interaction.guild.channels.cache.get(interaction.channel.id);

      const embed = new EmbedBuilder()
        .setTitle("Salon verrouiller")
        .setDescription(`Le salon ${channel} a été verrouiller !`)
        .addFields(
          { name: "Modérateur", value: `${interaction.user}`, inline: false },
          { name: "Raison", value: `${reason}`, inline: false },
        )
        .setColor(client.yellow)
        .setTimestamp()  

      interaction.channel.send({ embeds: [embed] })
    }
}