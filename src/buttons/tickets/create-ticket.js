const ticketData = require('../../models/ticketData')
const { Success } = require('../../utils/Success')
const { ChannelType, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js')
const { Error } = require('../../utils/Error')
const ticketInfos = require('../../models/ticket')

module.exports = {
    customId: "create-ticket",
    async execute(client, interaction) {
        const { guildId, guild } = interaction;

        const numberTicket = Math.floor(Math.random() * 9000) + 10000;

        const data = await ticketData.findOne({ Guild: guildId })

        if(!data) return Error(interaction, "Il n'y a pas de données de ticket qui a été trouvé, veuillez contacter le staff !")

        const Data = await ticketInfos.findOne({ Guild: guildId, memberId: interaction.user.id })

        if(Data) return Error(interaction, `Vous avez déjà un ticket en cours dans ce serveur ! <#${Data.channelId}>`)

        const memberRole = guild.roles.cache.get(data.memberRoleId)
        const staffRole = guild.roles.cache.get(data.staffRoleId)
        const categoryId = guild.channels.cache.get(data.categoryId)

        if(!memberRole) return Error(interaction, "Une erreur est survenue")
        if(!staffRole) return Error(interaction, "Une erreur est survenue")
        if(!categoryId) return Error(interaction, "Une erreur est survenue")

        guild.channels.create({
            name: `ticket-${numberTicket}`,
            type: ChannelType.GuildText,
            parent: categoryId,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                },
                {
                    id: memberRole,
                    deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                },
                {
                    id: staffRole,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                }
            ]
        }).then(channel => {
            new ticketInfos({
                Guild: guildId,
                memberId: interaction.user.id,
                channelId: channel.id
            }).save();

            try {interaction.user.send({ embeds: [
                new EmbedBuilder()
                    .setTitle("Création de ticket")
                    .setDescription(`Votre ticket sur le serveur **${interaction.guild.name}** a été créer ! ${channel} !`)
                    .setColor(client.color)
            ] })} catch(err) {}

            const button = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("close-ticket")
                    .setLabel("Fermer le ticket")
                    .setStyle(ButtonStyle.Danger)
            )

            channel.send({ content: `${interaction.user}`, embeds: [
                new EmbedBuilder()
                    .setTitle(`Ticket (${interaction.user.username})`)
                    .setDescription(`Bienvenue dans votre ticket ${interaction.user.username} ! Un membre du staff va prendre en charge votre ticket ! Merci de patienter !`)
                    .setColor(client.color)
                    .setTimestamp()
                    .setAuthor({ name: 'Système de ticket', iconURL: `${client.user.displayAvatarURL()}` })
            ], components: [button] })

            return Success(interaction, `Votre ticket a été créer avec succès ! ${channel}`)
        })


    }
}