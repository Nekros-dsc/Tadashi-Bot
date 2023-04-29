const { EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')
const ms = require('ms')

module.exports = {
  name: "kick",
  description: "Exclu un utilisateur",
  permissions: ["KickMembers"],
  usage: "/kick `[user: @utilisateur]` `[reason: raison]`",
  example: "/kick `[user: @drixerex]` `[reason: Insultes]`",
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
      description: "Raison",
      type: ApplicationCommandOptionType.String,
      required: true
    },
  ],
  async execute(client, interaction) {
    const target = interaction.options.getMember("user")
    const reason = interaction.options.getString("reason")

    if (target.user.bot) return Error(interaction, "Je ne peux pas kick un bot")

    if (target.user.id === client.user.id) return Error(interaction, "Je ne suis pas fou, mais j'ai du mal à accepter ta demande. 👀")
    if (!target.kickable) return Error(interaction, "Je ne peux pas kick ce membre !")

    const row = new ActionRowBuilder().addComponents(

      new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setCustomId("kick-yes")
        .setLabel("Oui"),

      new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setCustomId("kick-no")
        .setLabel("Non")

    )

    const embedp = new EmbedBuilder()
      .setTitle("Confirmation")
      .setDescription(`Vous voulez vraiment exclure ${target.user.username} ?`)
      .setThumbnail(`${target.user.displayAvatarURL()}`)
      .setColor(client.color)
      .setTimestamp()


    const page = await interaction.reply({
      embeds: [embedp],
      components: [row]
    })


    const col = await page.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: ms("15s")
    })

    col.on("collect", i => {

      if (i.user.id !== interaction.user.id) return;

      switch (i.customId) {

        case "kick-yes": {

          const embedpv = new EmbedBuilder()
            .setTitle("Sanction")
            .setDescription(`Vous venez d'être **exclu** du serveur **${interaction.guild.name}**\n**Raison :** ${reason}`)
            .setFooter({
              text: interaction.guild.name,
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })
            .setColor(client.color)

          target.send({ embeds: [embedpv] }).catch(() => target.kick(reason))
          target.kick(reason).catch(() => target.kick(reason))

          interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setDescription(`<:greentick:1025082258022993950> Ce membre a bien été kick !`)
                .setColor("Green")
            ], components: []
          })

          const embed = new EmbedBuilder()
            .setTitle("Membre exclu")
            .setDescription(`Un membre a été exclu du serveur **${interaction.guild.name}**`)
            .addFields(
              { name: "Membre", value: `${target.user.tag}`, inline: false },
              { name: "Raison", value: `${reason}`, inline: false },
            )
            .setColor(client.red)
            .setTimestamp()

          interaction.channel.send({ embeds: [embed] })

        }

          break;

        case "kick-no": {

          interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setDescription(` Sanction annulé !`)
                .setColor("Green")
            ], components: []
          })

        }

          break;

      }

    })

    col.on("end", (collected) => {
      if (collected.size > 0) return
    })
  }
}