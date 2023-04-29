const {  EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const warnModel = require('../../models/warnModel');
const moment = require('moment');
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
    name: "infractions",
    description: "Affiche les avertissement(s) d'un utilisateur",
    usage: "/infractions `[user: @utilisateur]`",
    example: "/infractions `[user: @drixerex]`",
    category: "🔨 Modération",
    permissions: ["KickMembers"],
    options: [
        {
            name: "user",
            description: "Utilisateur",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    async execute(client, interaction) {
        const target = interaction.options.getMember("user")

        const userWarnings = await warnModel.find({
            userId: target.id, 
            guildId: interaction.guildId
        });

        if(!userWarnings?.length) return Error(interaction, `${target} n'a aucun avertissement !`)

        const embedDescription = userWarnings.map((warn) => {
            const moderator = interaction.guild.members.cache.get(
                warn.moderatorId
            );

            return [
                `Identifiant d'avertissement : **${warn._id}**`,
                `Modérateur : **${moderator || "Utilisateur non trouvée"}**`,
                `Date : **${moment(warn.timestamp).format("[Le] DD/MM/YYYY [à] HH:mm:ss")}**`,
                `Raison : **${warn.reason}**` 
        
            ].join("\n");
        })
        .join("\n\n");

        const embed = new EmbedBuilder()
            .setTitle(`Infractions de ${target.user.tag}`)
            .setDescription(embedDescription)
            .setTimestamp()
            .setFooter({
                text: "Infractions"
            })
            .setColor(client.color)

        interaction.reply({ embeds: [embed] })
    }
}