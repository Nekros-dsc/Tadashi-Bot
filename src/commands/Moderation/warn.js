const { EmbedBuilder } = require('discord.js');
const warnModel = require('../../models/warnModel')
const { ApplicationCommandOptionType } = require('discord.js');
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
    name: "warn",
    description: "Avertit un utilisateur",
    usage: "/warn `[user: @utilisateur]` `(reason: raison)`",
    example: "/warn `[user: @drixerex]` `(reason: ping)`",
    category: "🔨 Modération",
    permissions: ["KickMembers"],
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
            required: false
        }
    ],
    async execute(client, interaction) {
        const target = interaction.options.getMember("user")
        const reason = interaction.options.getString("reason") || "Aucune raison"

        if(target.user.bot) return Error(interaction, "Je ne peux pas mute un bot")

        if(target.id === client.user.id) return Error(interaction, "Impossible de me warn !")

        new warnModel({
            userId: target.id,
            guildId: interaction.guildId,
            moderatorId: interaction.user.id,
            reason,
            timestamp: Date.now(),
        }).save()

        Success(interaction, `Ce membre a bien été averti !`)

        const embed = new EmbedBuilder()
            .setTitle("Membre warn")
            .setDescription(`Un membre a été warn du serveur **${interaction.guild.name}**`)
            .addFields(
            { name: "Membre", value: `${target.user.tag}`, inline: false },
            { name: "Raison", value: `${reason}`, inline: false },
            )
            .setColor(client.color)
            .setTimestamp()
            
        const embedpv = new EmbedBuilder()
            .setTitle("Sanction")
            .setDescription(`Vous venez d'être **avertit** du serveur **${interaction.guild.name}**\n**Raison : ${reason}**`)
            .setFooter({
                text: interaction.guild.name,
                iconURL: interaction.guild.iconURL({dynamic: true})
            })
            .setColor(client.color)

        interaction.channel.send({ embeds: [embed] })
        try {target.send({ embeds: [embedpv] })} catch(err){}
    }
}