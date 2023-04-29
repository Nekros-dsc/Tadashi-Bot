const { ApplicationCommandOptionType, ActionRowBuilder, ComponentType, SelectMenuBuilder, ChannelType, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const suggestionChannelData = require('../../models/suggestChannel')
const annonceChannelData = require('../../models/annonceChannel')
const poolData = require('../../models/poolChannel')
const boostData = require('../../models/boostData')
const ticketData = require('../../models/ticketData')
const logsData = require('../../models/logsModel')
const welcomeData = require('../../models/welcomeData')
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')
const ms = require('ms')

module.exports = {
    name: "config",
    description: "Permet de configurer Tadashi dans ce serveur",
    usage: "/config",
    example: "/config",
    category: "🔨 Modération",
    permissions: ["ModerateMembers"],
    options: [
        {
            name: "info",
            description: "Permet de savoir l'information d'un configuration",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "config",
                    description: "Configuration",
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: "Suggestion",
                            value: "1"
                        },
                        {
                            name: "Annonce",
                            value: "2"
                        },
                        {
                            name: "Sondage",
                            value: "3"
                        },
                        {
                            name: "Bienvenue",
                            value: "4"
                        },
                        {
                            name: "Boost",
                            value: "5"
                        },
                        {
                            name: "Logs",
                            value: "6"
                        },
                        {
                            name: "Ticket",
                            value: "7"
                        },
                    ],
                    required: true
                }
            ],
        },
        {
            name: "delete",
            description: "Permet de supprimer une configuration",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "config",
                    description: "Configuration",
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: "Suggestion",
                            value: "1"
                        },
                        {
                            name: "Annonce",
                            value: "2"
                        },
                        {
                            name: "Sondage",
                            value: "3"
                        },
                        {
                            name: "Bienvenue",
                            value: "4"
                        },
                        {
                            name: "Boost",
                            value: "5"
                        },
                        {
                            name: "Logs",
                            value: "6"
                        },
                        {
                            name: "Ticket",
                            value: "7"
                        },
                    ],
                    required: true
                }
            ],
        },
        {
            name: "suggest",
            description: "Configurer le salon de suggestion",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Salon",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required: true
                }
            ]
        },
        {
            name: "logs",
            description: "Configurer le système de logs",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Salon",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required: true
                }
            ]
        },
        {
            name: "annonce",
            description: "Configurer le système d'annonce",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Salon",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText, ChannelType.GuildAnnouncement],
                    required: true
                },
                {
                    name: "role",
                    description: "Rôle à mentionner lors de l'annonce",
                    type: ApplicationCommandOptionType.Role,
                    required: true
                }
            ]
        },
        {
            name: "pool",
            description: "Configurer le système de sondages",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Salon",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText, ChannelType.GuildAnnouncement],
                    required: true
                },
                {
                    name: "role",
                    description: "Rôle à mentionner lors du sondage",
                    type: ApplicationCommandOptionType.Role,
                    required: true
                }
            ]
        },
        {
            name: "welcome",
            description: "Configurer le système de bienvenue",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Salon",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText, ChannelType.GuildAnnouncement],
                    required: true
                },
                {
                    name: "auto_role",
                    description: "Auto rôle",
                    type: ApplicationCommandOptionType.Role,
                    required: false
                }
            ]
        },
        {
            name: "antispam",
            description: "Configurer le système de spam",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "exception_salon",
                    description: "Salon d'exception",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText, ChannelType.GuildAnnouncement],
                    required: false
                }
            ]
        },
        {
            name: "boost",
            description: "Configurer les messages de boost",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Salon",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText, ChannelType.GuildAnnouncement],
                    required: true
                }
            ]
        },
        {
            name: "ticket-panel",
            description: "Permet d'envoyer le panel du ticket",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "ticket",
            description: "Permet de configurer le système de ticket",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Salon",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText, ChannelType.GuildAnnouncement],
                    required: true
                },
                {
                    name: "button_label",
                    description: "Texte a écrire dans le bouton de création de ticket",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "staff_role",
                    description: "Rôle du staff",
                    type: ApplicationCommandOptionType.Role,
                    required: true
                },
                {
                    name: "members_role",
                    description: "Rôle des membres",
                    type: ApplicationCommandOptionType.Role,
                    required: true
                },
                {
                    name: "category",
                    description: "Catégorie du ticket",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildCategory],
                    required: true
                },
            ]
        }
    ],
    async execute(client, interaction) {
        const { options, guild } = interaction;

        if (options.getSubcommand() === "info") {
            const config = options.getString("config")

            if (config === "1") {
                const data = await suggestionChannelData.findOne({ Guild: guild.id })
                if (!data) return Error(interaction, "Il n'y a pas de données enregistrés pour la configuration des suggestion")

                const embed = new EmbedBuilder()
                    .setTitle("Informations sur la configuration des suggestions")
                    .setDescription(
                        `
                        Informations sur la configuration des suggestions du serveur ${guild.name}

                        > **Salon :** ${guild.channels.cache.get(data.channelId) ? guild.channels.cache.get(data.channelId) : "Salon supprimé ou inconnu"}
                        `
                    )
                    .setColor(client.color)

                interaction.reply({ embeds: [embed] })
            }

            if (config === "2") {
                const data = await annonceChannelData.findOne({ Guild: guild.id })
                if (!data) return Error(interaction, "Il n'y a pas de données enregistrés pour la configuration des suggestion")

                const embed = new EmbedBuilder()
                    .setTitle("Informations sur la configuration des annonces")
                    .setDescription(
                        `
                        Informations sur la configuration des annonces du serveur ${guild.name}

                        > **Salon :** ${guild.channels.cache.get(data.channelId) ? guild.channels.cache.get(data.channelId) : "Salon supprimé ou inconnu"}
                        > **Rôle :** ${guild.roles.cache.get(data.role) ? guild.roles.cache.get(data.role) : "Rôle supprimé ou inconnu"}
                        `
                    )
                    .setColor(client.color)

                interaction.reply({ embeds: [embed] })
            }

            if (config === "3") {
                const data = await poolData.findOne({ Guild: guild.id })
                if (!data) return Error(interaction, "Il n'y a pas de données enregistrés pour la configuration des sondages")

                const embed = new EmbedBuilder()
                    .setTitle("Informations sur la configuration des sondages")
                    .setDescription(
                        `
                        Informations sur la configuration des sondages du serveur ${guild.name}

                        > **Salon :** ${guild.channels.cache.get(data.channelId) ? guild.channels.cache.get(data.channelId) : "Salon supprimé ou inconnu"}
                        > **Rôle :** ${guild.roles.cache.get(data.role) ? guild.roles.cache.get(data.role) : "Rôle supprimé ou inconnu"}
                        `
                    )
                    .setColor(client.color)

                interaction.reply({ embeds: [embed] })
            }

            if (config === "4") {
                const data = await welcomeData.findOne({ Guild: guild.id })
                if (!data) return Error(interaction, "Il n'y a pas de données enregistrés pour la configuration des sondages")

                const embed = new EmbedBuilder()
                    .setTitle("Informations sur la configuration du système de bienvenue")
                    .setDescription(
                        `
                        Informations sur la configuration du système de bienvenue du serveur ${guild.name}

                        > **Salon :** ${guild.channels.cache.get(data.channelId) ? guild.channels.cache.get(data.channelId) : "Salon supprimé ou inconnu"}
                        > **Rôle :** ${guild.roles.cache.get(data.role) ? guild.roles.cache.get(data.role) : "Rôle supprimé ou inconnu"}
                        > **Message de bienvenue :** 
                        \`\`\`${data.msg ? data.msg : "Message non enregistrer"}\`\`\`
                        `
                    )
                    .setColor(client.color)

                interaction.reply({ embeds: [embed] })
            }


            if (config === "5") {
                const data = await boostData.findOne({ Guild: guild.id })
                if (!data) return Error(interaction, "Il n'y a pas de données enregistrés pour la configuration de les messages de boost")

                const embed = new EmbedBuilder()
                    .setTitle("Informations sur la configuration des messages de boost")
                    .setDescription(
                        `
                        Informations sur la configuration des messages de boost du serveur ${guild.name}

                        > **Salon :** ${guild.channels.cache.get(data.channelId) ? guild.channels.cache.get(data.channelId) : "Salon non enregistré ou inconnu"}
                        `
                    )
                    .setColor(client.color)

                interaction.reply({ embeds: [embed] })
            }

            if (config === "6") {
                const data = await logsData.findOne({ Guild: guild.id })
                if (!data) return Error(interaction, "Il n'y a pas de données enregistrés pour le système de logs")

                const embed = new EmbedBuilder()
                    .setTitle("Informations sur le système de logs")
                    .setDescription(
                        `
                        Informations sur le système de logs du serveur ${guild.name}

                        > **Salon :** ${guild.channels.cache.get(data.channelId) ? guild.channels.cache.get(data.channelId) : "Salon non enregistré ou inconnu"}
                        `
                    )
                    .setColor(client.color)

                interaction.reply({ embeds: [embed] })
            }

            if (config === "7") {
                const data = await ticketData.findOne({ Guild: guild.id })
                if (!data) return Error(interaction, "Il n'y a pas de données enregistrés pour le système de logs")

                const embed = new EmbedBuilder()
                    .setTitle("Informations sur le système de logs")
                    .setDescription(
                        `
                        Informations sur le système de logs du serveur ${guild.name}

                        > **Salon du panel :** ${guild.channels.cache.get(data.channelId) ? guild.channels.cache.get(data.channelId) : "Salon non enregistré ou inconnu"}
                        > **Rôle des membres :** ${guild.roles.cache.get(data.memberRoleId) ? guild.roles.cache.get(data.memberRoleId) : "Rôle non enregistré ou inconnu"}
                        > **Rôles du staff :** ${guild.roles.cache.get(data.staffRoleId) ? guild.roles.cache.get(data.staffRoleId) : "Rôle non enregistré ou inconnu"}
                        > **Catégorie des tickets :** ${guild.channels.cache.get(data.categoryId) ? guild.channels.cache.get(data.categoryId).name : "Catégorie non enregistré ou inconnu"}
                        `
                    )
                    .setColor(client.color)

                interaction.reply({ embeds: [embed] })
            }
        }


        if (options.getSubcommand() === "delete") {
            const config = options.getString("config")

            if (config === "1") {
                const data = await suggestionChannelData.findOne({ Guild: guild.id })
                if (!data) return Error(interaction, "Il n'y a pas de données enregistrés pour la configuration des suggestion")

                await data.delete()

                Success(interaction, "Les configuration des suggestions ont été supprimé avec succès !")
            }

            if (config === "2") {
                const data = await annonceChannelData.findOne({ Guild: guild.id })
                if (!data) return Error(interaction, "Il n'y a pas de données enregistrés pour la configuration des suggestion")

                await data.delete()

                Success(interaction, "Les configuration des annonces ont été supprimé avec succès !")
            }

            if (config === "3") {
                const data = await poolData.findOne({ Guild: guild.id })
                if (!data) return Error(interaction, "Il n'y a pas de données enregistrés pour la configuration des sondages")

                await data.delete()

                Success(interaction, "Les configuration des sondages ont été supprimé avec succès !")

            }

            if (config === "4") {
                const data = await welcomeData.findOne({ Guild: guild.id })
                if (!data) return Error(interaction, "Il n'y a pas de données enregistrés pour la configuration des sondages")

                await data.delete()

                Success(interaction, "Les configuration des messages de bienvenue ont été supprimé avec succès !")
            }


            if (config === "5") {
                const data = await boostData.findOne({ Guild: guild.id })
                if (!data) return Error(interaction, "Il n'y a pas de données enregistrés pour la configuration de les messages de boost")

                await data.delete()

                Success(interaction, "Les configuration des messages de boost ont été supprimé avec succès !")

            }


            if (config === "6") {
                const data = await logsData.findOne({ Guild: guild.id })
                if (!data) return Error(interaction, "Il n'y a pas de données enregistrés pour la système de logs !")

                await data.delete()

                Success(interaction, "Le système de logs a été supprimé avec succès !")
            }

            if (config === "7") {
                const data = await ticketData.findOne({ Guild: guild.id })
                if (!data) return Error(interaction, "Il n'y a pas de données enregistrés pour la système de ticket !")

                await data.delete()

                Success(interaction, "La configuration du système de ticket a été supprimé avec succès !")
            }
        }

        if (options.getSubcommand() === "suggest") {
            const channel = options.getChannel("channel")

            suggestionChannelData.findOne({ Guild: guild.id }, async (err, data) => {
                if (data) {
                    data.channelId = channel.id;
                    data.save()

                    return Success(interaction, `Le salon de suggestion a été modifié pour le salon ${channel} avec succès !`)
                } else {
                    new suggestionChannelData({
                        Guild: guild.id,
                        channelId: channel.id
                    }).save();

                    return Success(interaction, `Le salon de suggestion a été enregisteré pour le salon ${channel} avec succès !`)
                }
            })

        }

        if (options.getSubcommand() === "annonce") {
            const channel = options.getChannel("channel")
            const role = options.getRole("role")

            annonceChannelData.findOne({ Guild: guild.id }, async (err, data) => {
                if (data) {
                    data.channelId = channel.id;
                    data.role = role.id;
                    data.save()

                    return Success(interaction, `Le salon d'annonce et de rôle a été modifié pour le salon ${channel} et le rôle ${role} avec succès !`)
                } else {
                    new annonceChannelData({
                        Guild: guild.id,
                        channelId: channel.id,
                        role: role.id
                    }).save();

                    return Success(interaction, `Le salon d'annonce et de rôle a été enregistré pour le salon ${channel} et le rôle ${role} avec succès !`)
                }
            })
        }


        if (options.getSubcommand() === "pool") {
            const channel = options.getChannel("channel")
            const role = options.getRole("role")

            poolData.findOne({ Guild: guild.id }, async (err, data) => {
                if (data) {
                    data.channelId = channel.id;
                    data.role = role.id;
                    data.save()

                    return Success(interaction, `Le salon de sondages et de rôle a été modifié pour le salon ${channel} et le rôle ${role} avec succès !`)
                } else {
                    new poolData({
                        Guild: guild.id,
                        channelId: channel.id,
                        role: role.id
                    }).save();

                    return Success(interaction, `Le salon de sondages et de rôle a été enregistré pour le salon ${channel} et le rôle ${role} avec succès !`)
                }
            })
        }

        if (options.getSubcommand() === "welcome") {
            const channel = options.getChannel("channel")
            const role = options.getRole("auto_role")

            const embed = new EmbedBuilder()
                .setTitle("Configuration des messages de bienvenue")
                .setDescription("Bienvenue dans le système de configuration des messages de bienvenue personnalisés, afin d'enregistrer votre message de bienvenue, veuillez intéragir avec le bouton qui se nomme \"Enregistrer le message de bienvenue\"\n\n**Variables :**\n> `{userMention}` ➔ Mention de l'utilisateur\n> `{userTag}` ➔ Nom d'utilisateur avec le Tag\n> `{username}` ➔ Nom d'utilisateur\n> `{guildName}` ➔ Nom du serveur\n> `{memberCount}` ➔ Nombre de membres dans le serveur")
                .setColor(client.color)
                .setTimestamp()

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("welcome-msg")
                    .setLabel("Enregistrer le message de bienvenue")
                    .setStyle(ButtonStyle.Success)
            )

            if (!role) {
                welcomeData.findOne({ Guild: guild.id }, async (err, data) => {
                    if (data) {
                        data.channelId = channel.id;
                        data.save()

                        const page = await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle("Voulez vous changer le message de bienvenue ?")
                                    .setColor(client.color)
                                    .setAuthor({ name: "Système de bienvenue", iconURL: `${client.user.displayAvatarURL()}` })
                            ], components: [
                                new ActionRowBuilder().addComponents(
                                    new ButtonBuilder()
                                        .setCustomId("welcome-yes")
                                        .setLabel("Oui")
                                        .setStyle(ButtonStyle.Success),

                                    new ButtonBuilder()
                                        .setCustomId("welcome-no")
                                        .setLabel("Non")
                                        .setStyle(ButtonStyle.Danger)
                                )
                            ], fetchReply: true
                        })

                        const col = await page.createMessageComponentCollector({
                            componentType: ComponentType.Button,
                            time: ms("15s")
                        })

                        col.on("collect", i => {

                            if (i.user.id !== interaction.user.id) return;

                            switch (i.customId) {

                                case "welcome-yes": {
                                    page.edit({ embeds: [embed], components: [row] })
                                }

                                    break;

                                case "welcome-no": {

                                    page.edit({
                                        content: null, embeds: [
                                            new EmbedBuilder()
                                                .setDescription("Les changements ont été enregistrer avec succès !")
                                                .setColor("Green")
                                        ], components: []
                                    })

                                }

                                    break;

                            }

                        })

                        col.on("end", (collected) => {
                            if (collected.size > 0) return page.edit({ content: null, embeds: [
                                new EmbedBuilder()
                                    .setTitle("Commande annulé.")
                                    .setColor(client.color)
                            ], components: [] })
                        })

                    } else {
                        new welcomeData({
                            Guild: guild.id,
                            channelId: channel.id,
                        }).save();

                        const page = await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle("Voulez vous changer le message de bienvenue ?")
                                    .setColor(client.color)
                                    .setAuthor({ name: "Système de bienvenue", iconURL: `${client.user.displayAvatarURL()}`})
                            ], components: [
                                new ActionRowBuilder().addComponents(
                                    new ButtonBuilder()
                                        .setCustomId("welcome-yes")
                                        .setLabel("Oui")
                                        .setStyle(ButtonStyle.Success),

                                    new ButtonBuilder()
                                        .setCustomId("welcome-no")
                                        .setLabel("Non")
                                        .setStyle(ButtonStyle.Danger)
                                )
                            ], fetchReply: true
                        })

                        const col = await page.createMessageComponentCollector({
                            componentType: ComponentType.Button,
                            time: ms("15s")
                        })

                        col.on("collect", i => {

                            if (i.user.id !== interaction.user.id) return;

                            switch (i.customId) {

                                case "welcome-yes": {
                                    page.edit({ embeds: [embed], components: [row] })
                                }

                                    break;

                                case "welcome-no": {

                                    page.edit({
                                        content: null, embeds: [
                                            new EmbedBuilder()
                                                .setDescription("Les changements ont été enregistrer avec succès !")
                                                .setColor("Green")
                                        ], components: []
                                    })

                                }

                                    break;

                            }

                        })

                        col.on("end", (collected) => {
                            if (collected.size > 0) return page.edit({ content: null, embeds: [
                                new EmbedBuilder()
                                    .setTitle("Commande annulé.")
                                    .setColor(client.color)
                            ], components: [] })
                        })
                    }
                })


            }

            if (role) {
                welcomeData.findOne({ Guild: guild.id }, async (err, data) => {
                    if (data) {
                        data.channelId = channel.id
                        data.role = role.id
                        data.save()

                        const page = await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle("Voulez vous changer le message de bienvenue ?")
                                    .setColor(client.color)
                                    .setAuthor({ name: "Système de bienvenue", iconURL: `${client.user.displayAvatarURL()}`})
                            ], components: [
                                new ActionRowBuilder().addComponents(
                                    new ButtonBuilder()
                                        .setCustomId("welcome-yes")
                                        .setLabel("Oui")
                                        .setStyle(ButtonStyle.Success),

                                    new ButtonBuilder()
                                        .setCustomId("welcome-no")
                                        .setLabel("Non")
                                        .setStyle(ButtonStyle.Danger)
                                )
                            ], fetchReply: true
                        })

                        const col = await page.createMessageComponentCollector({
                            componentType: ComponentType.Button,
                            time: ms("15s")
                        })

                        col.on("collect", i => {

                            if (i.user.id !== interaction.user.id) return;

                            switch (i.customId) {

                                case "welcome-yes": {
                                    page.edit({ embeds: [embed], components: [row] })
                                }

                                    break;

                                case "welcome-no": {

                                    page.edit({
                                        content: null, embeds: [
                                            new EmbedBuilder()
                                                .setDescription("Les changements ont été enregistrer avec succès !")
                                                .setColor("Green")
                                        ], components: []
                                    })

                                }

                                    break;

                            }

                        })

                        col.on("end", (collected) => {
                            if (collected.size > 0) return page.edit({ content: null, embeds: [
                                new EmbedBuilder()
                                    .setTitle("Commande annulé.")
                                    .setColor(client.color)
                            ], components: [] })
                        })

                    } else {
                        new welcomeData({
                            Guild: guild.id,
                            channelId: channel.id,
                            role: role.id
                        }).save();

                        const page = await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle("Voulez vous changer le message de bienvenue ?")
                                    .setColor(client.color)
                                    .setAuthor({ name: "Système de bienvenue", iconURL: `${client.user.displayAvatarURL()}`})
                            ], components: [
                                new ActionRowBuilder().addComponents(
                                    new ButtonBuilder()
                                        .setCustomId("welcome-yes")
                                        .setLabel("Oui")
                                        .setStyle(ButtonStyle.Success),

                                    new ButtonBuilder()
                                        .setCustomId("welcome-no")
                                        .setLabel("Non")
                                        .setStyle(ButtonStyle.Danger)
                                )
                            ], fetchReply: true
                        })

                        const col = await page.createMessageComponentCollector({
                            componentType: ComponentType.Button,
                            time: ms("15s")
                        })

                        col.on("collect", i => {

                            if (i.user.id !== interaction.user.id) return;

                            switch (i.customId) {

                                case "welcome-yes": {
                                    page.edit({ embeds: [embed], components: [row] })
                                }

                                    break;

                                case "welcome-no": {

                                    page.edit({
                                        content: null, embeds: [
                                            new EmbedBuilder()
                                                .setDescription("Les changements ont été enregistrer avec succès !")
                                                .setColor("Green")
                                        ], components: []
                                    })

                                }

                                    break;

                            }

                        })

                        col.on("end", (collected) => {
                            if (collected.size > 0) return page.edit({ content: null, embeds: [
                                new EmbedBuilder()
                                    .setTitle("Commande annulé.")
                                    .setColor(client.color)
                            ] ,components: [] })
                        })
                    }
                })
            }
        }


        if (options.getSubcommand() === "boost") {
            const channel = options.getChannel("channel")

            boostData.findOne({ Guild: guild.id }, async (err, data) => {
                if (data) {
                    data.channelId = channel.id
                    data.save()

                    return Success(interaction, `Le salon des messages de boost a été modifié pour le salon ${channel} avec succès !`)
                } else {
                    new boostData({
                        Guild: guild.id,
                        channelId: channel.id
                    }).save();

                    return Success(interaction, `Le salon des messages de boost a été enregistré pour le salon ${channel} avec succès !`)
                }
            })
        }

        if (options.getSubcommand() === "logs") {
            const channel = options.getChannel("channel")

            logsData.findOne({ Guild: guild.id }, async (err, data) => {
                if (data) {
                    data.channelId = channel.id
                    data.save()

                    return Success(interaction, `Le salon des logs a été modifié pour le salon ${channel} avec succès !`)
                } else {
                    new logsData({
                        Guild: guild.id,
                        channelId: channel.id
                    }).save();

                    return Success(interaction, `Le salon des logs a été enregistré pour le salon ${channel} avec succès !`)
                }
            })
        }

        if (options.getSubcommand() === "ticket") {
            const channel = options.getChannel("channel")
            const staff_role = options.getRole("staff_role")
            const members_role = options.getRole("members_role")
            const buttonLabel = options.getString("button_label")
            const category = options.getChannel("category")

            const data = await ticketData.findOne({ Guild: guild.id })

            if (data) {
                data.channelId = channel.id,
                data.staffRoleId = staff_role.id,
                data.memberRoleId = members_role.id,
                data.ButtonLabel = buttonLabel
                data.categoryId = category.id

                data.save()

                return Success(interaction, "La configuration du système de ticket a été modifié avec succès, veuillez refaire la commande `/config ticket-panel` pour que le panel de ticket s'envoie.")
            }

            if (!data) {
                new ticketData({
                    Guild: guild.id,
                    staffRoleId: staff_role.id,
                    memberRoleId: members_role.id,
                    ButtonLabel: buttonLabel,
                    channelId: channel.id,
                    categoryId: category.id
                }).save()

                return Success(interaction, "La configuration du système de ticket a été enregistré avec succès, veuillez faire la commande `/config ticket-panel` pour que le panel de ticket s'envoie.")
            }
        }

        if (options.getSubcommand() === "ticket-panel") {
            const data = await ticketData.findOne({ Guild: guild.id })

            if (!data) return Error(interaction, "Il n'y a pas de données enregistré pour le système de ticket, veuillez faire la commande `/config ticket` !")

            const channel = guild.channels.cache.get(data.channelId)

            if (!channel) return Error(interaction, "Le salon configurer est inconnu !")

            channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Créer un ticket")
                        .setDescription(`Bienvenue dans le système de création de ticket ! Pour ouvrir un ticket, veuillez intéragir avec le bouton qui se nomme "${data.ButtonLabel}" et un ticket s'ouvrira.`)
                        .setTimestamp()
                        .setColor(client.color)
                        .setAuthor({ name: 'Système de ticket', iconURL: `${client.user.displayAvatarURL()}` })
                ], components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId("create-ticket")
                            .setLabel(`${data.ButtonLabel}`)
                            .setStyle(ButtonStyle.Success)
                    )
                ]
            })

            return Success(interaction, `Le panel de ticket a été envoyé avec succès dans le salon ${channel}`)
        }
    }
};