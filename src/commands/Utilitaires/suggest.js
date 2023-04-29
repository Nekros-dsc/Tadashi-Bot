const {
    ApplicationCommandOptionType,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const SuggestDB = require("../../models/SuggestDB");
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')
const channelData = require('../../models/suggestChannel')

module.exports = {
    name: "suggest",
    description: "Permet de faire une suggestion",
    permissions: ["UseApplicationCommands"],
    usage: "/suggest `[suggestion: suggestion]`",
    example: "/suggest `[suggestion: Inviter Tadashi dans ce serveur]`",
    category: "⚙️ Utilités",
    options: [
        {
            name: "suggestion",
            description: "Suggestion",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async execute(client, interaction) {
        const { guild, options, member } = interaction;

        const name = options.getString("suggestion");

        const embed = new EmbedBuilder()
            .setColor("Navy")
            .setAuthor({
                name: `${interaction.user.tag}`,
                iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
            })
            .setTitle(`Suggestion de ${interaction.user.username}`)
            .addFields(
                { name: "Suggestion", value: `${name}`, inline: false },
                { name: "Status", value: "En attente", inline: false }
            )
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("suggest-accept")
                .setEmoji(`✅`)
                .setStyle(ButtonStyle.Success)
                .setLabel("Accepter"),
            new ButtonBuilder()
                .setCustomId("suggest-decline")
                .setEmoji(`❌`)
                .setStyle(ButtonStyle.Danger)
                .setLabel("Refuser")
        );

        const channelData1 = await channelData.findOne({ Guild: guild.id })
        
        if(!channelData1) return Error(interaction, "Les modérateurs ou les administrateurs n'ont pas configurés le salon des suggestion, préviens l'équipe du staff de ton serveur de le configurer ! Dis a tes modérateurs de faire la commande slash `/config suggest` de Protect !")

        const channel = guild.channels.cache.get(channelData1.channelId)

        if(!channel) return Error(interaction, "Le salon est invalide !")

        const msg = await channel.send({ embeds: [embed], components: [row] }).catch(err => { })

        msg.react('✅')
        msg.react('❌')

        Success(interaction, `Le [suggestion](https://discord.com/channels/${guild.id}/${channel.id}/${msg.id}) a été envoyé avec succès !`)

        await SuggestDB.create({
            Guild: guild.id,
            Message: msg.id,
            Details: [
                {
                    MemberID: interaction.user.id,
                    Suggestion: name,
                },
            ],
        });
    },
};