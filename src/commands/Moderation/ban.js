const {  EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const Success = require("../../utils/Success")
const Error = require('../../utils/Error')

module.exports = {
    name: "ban",
    description: "Ban un utilisateur",
    usage: `/ban \`[user: @utilisateur]\` \`[reason: raison]\``,
    example: "/ban `[user: @drixerex]` `[reason: Insultes abusive]`",
    category: "🔨 Modération",
    permissions: ["BanMembers"],
    options: [
      {
          name: "user",
          description: "Utilisateur à bannir",
          type: ApplicationCommandOptionType.User,
          required: true
      },
      {
          name: "raison",
          description: "Raison du bannissement",
          type: ApplicationCommandOptionType.String,
          required: true
      }
  ],
  async runInteraction (client, interaction) {
    const target = interaction.options.getMember("user")
    const reason = interaction.options.getString("raison")

    if(target.id === client.user.id) return Error(interaction, "Je ne suis pas fou, mais j'ai du mal à accepter ta demande. 👀")

    if (!target.bannable) return Error(interaction, "Ce membre ne peut pas être ban par le bot !")
  
    const embedpv = new EmbedBuilder()
    .setTitle("Sanction")
    .setDescription(`Vous venez d'être **banni** du serveur **${interaction.guild.name}**\n**Raison :** ${reason}\n**Fin de la sanction :** Indéterminée`)
    .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL({dynamic: true})
    })
    .setColor(client.color)  

    target.send({ embeds: [embedpv] }).catch(() => target.ban({ reason }))
    target.ban({ reason }).catch(() => target.ban({ reason }))
    Success(interaction, "Ce membre a bien été banni !")

    const embed = new  EmbedBuilder()
      .setTitle("Membre banni")
      .setDescription(`Un membre a été banni du serveur **${interaction.guild.name}**`)
      .addFields(
        { name: "Membre", value: `${target.user.tag}`, inline: false },
        { name: "Raison", value: `${reason}`, inline: false },
      )
      .setColor("#ff0000")
      .setTimestamp()
      
    interaction.channel.send({ embeds: [embed] })
  }
}