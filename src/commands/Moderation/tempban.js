const {  EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
    name: "tempban",
    description: "Banni temporairement un utilisateur",
    permissions: ["BanMembers"],
    usage: "/tempban `[user: @utilisateur]` `[reason: raison]` `[time: durée]`",
    example: "/tempban `[user: @drixerex]` `[reason: Spam abusive]` `[time: 1 jour]`",
    category: "🔨 Modération",
    options: [
      {
        name: "user",
        description: "Utilisateur",
        type: ApplicationCommandOptionType.User,
        required: true
      },
      {
        name: "reason",
        description: "Raison du bannissement",
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: "time",
        description: "Durée du banissement",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          {
            name: "1 jour",
            value: "1"
          },
          {
            name: "2 jours",
            value: "2"
          },
          {
            name: "3 jours",
            value: "3"
          },
          {
            name: "4 jours",
            value: "4"
          },
          {
            name: "5 jours",
            value: "5"
          },
          {
            name: "6 jours",
            value: "6"
          },
          {
            name: "7 jours",
            value: "7"
          }
        ]
      },
    ],
    async execute(client, interaction) {
      const target = interaction.options.getMember("user")

      const duration = interaction.options.getString("time")
      const reason = interaction.options.getString("reason")

      if (!target.bannable) return Error(interaction, "Ce membre ne peut pas être ban par le bot !")

      target.ban({ days: duration, reason: reason })
      Success(interaction, `Ce membre a bien été banni pendant ${duration} jours pour la raison suivante : ${reason}!`)
      const embed = new  EmbedBuilder()
        .setTitle("Membre tempban")
        .setDescription(`Un membre a été banni temporairement du serveur **${interaction.guild.name}**`)
        .addFields(
          { name: "Membre", value: `${target.user.tag}`, inline: false },
          { name: "Durée", value: `${duration} jours` },
          { name: "Raison", value: `${reason}`, inline: false },
        )
        .setColor("#ff0000")
        .setTimestamp()     
      
      interaction.channel.send({ embeds: [embed] })
    }
}