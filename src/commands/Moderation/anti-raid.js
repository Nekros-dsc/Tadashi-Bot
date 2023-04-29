const { ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder } = require('discord.js')
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')
const config = require('../../models/antiraid')

module.exports = {
    name: "anti-raid",
    description: "Permet de choisir un option pour la défense en cas de raid",
    usage: "/antiraid",
    example: "/antiraid",
    category: "🔨 Modération",
    permissions: ["Administrator"],
    owner: "true",
    options: [
        {
            name: "documentation",
            description: "Conseille pour que l'anti-raid soit efficace",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "bot",
            description: "Le mode anti-bot",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "état",
                    description: "Activer ou désactiver le mode anti-bot",
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: "Activer",
                            value: "on"
                        },
                        {
                            name: "Désactiver",
                            value: "off"
                        }
                    ],
                    required: true
                }
            ],
        },
        {
            name: "spam",
            description: "Le mode anti-spam",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "état",
                    description: "Activer ou désactiver le mode anti-spam",
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: "Activer",
                            value: "on"
                        },
                        {
                            name: "Désactiver",
                            value: "off"
                        }
                    ],
                    required: true
                }
            ],
        },
        {
            name: "mass-ping",
            description: "Le mode anti-mass-ping",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "état",
                    description: "Activer ou désactiver le mode anti-mass-ping",
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: "Activer",
                            value: "on"
                        },
                        {
                            name: "Désactiver",
                            value: "off"
                        }
                    ],
                    required: true
                }
            ],
        },
        {
            name: "lien",
            description: "Le mode anti-lien",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "état",
                    description: "Activer ou désactiver le mode anti-lien",
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: "Activer",
                            value: "on"
                        },
                        {
                            name: "Désactiver",
                            value: "off"
                        }
                    ],
                    required: true
                }
            ],
        },
        {
            name: "channel-delete",
            description: "Le mode anti-suppression de salon",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "état",
                    description: "Activer ou désactiver le mode anti-suppression de salon",
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: "Activer",
                            value: "on"
                        },
                        {
                            name: "Désactiver",
                            value: "off"
                        }
                    ],
                    required: true
                }
            ],
        },
        {
            name: "channel-create",
            description: "Le mode anti-création de salon",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "état",
                    description: "Activer ou désactiver le mode anti-création de salon",
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: "Activer",
                            value: "on"
                        },
                        {
                            name: "Désactiver",
                            value: "off"
                        }
                    ],
                    required: true
                }
            ],
        },
        {
            name: "everyone",
            description: "Le mode anti-everyone/here",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "état",
                    description: "Activer ou désactiver le mode anti-everyone/here",
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: "Activer",
                            value: "on"
                        },
                        {
                            name: "Désactiver",
                            value: "off"
                        }
                    ],
                    required: true
                }
            ],
        },
    ],
    async execute(client, interaction) {
        const { options, guild } = interaction;

        const data = await config.findOne({ Guild: guild.id })

        if(options.getSubcommand() === "documentation") {
            const embed = new EmbedBuilder()
                .setTitle("Conseille pour que Protect soit efficace lors d'un raid")
                .setDescription("Les conseilles pour que **Protect** soit efficace lors d'un raid")
                .addFields(
                    {
                        name: "Placer les rôles",
                        value: `
                        > Il est toujours conseillé pour que Protect soit efficace lors d'un raid, de placer le rôle d'intégration du bot  tout en haut de la liste, même en haut des rôles d'administrateurs, ceci permet d'avoir un performance d'anti-raid, et de réagir aux raids sans erreurs et au cas où il y'a un méchant pirate qui "hack" le compte d'un administrateur du serveur pour faire n'importe quoi dans le serveur, pour protéger le serveur, Protect kickera l'administrateur et ceci ajoutera un grand + de protections !
                        `
                    }
                )    
                
            return interaction.reply({ embeds: [embed] })
        }

        if(options.getSubcommand() === "bot") {
            const choices = options.getString("état")

            if(choices === "on") {
                if(!data) {
                    new config({
                        Guild: guild.id,
                        Bot: true
                    }).save();
                }

                if(data) {
                    if(data.Bot === true) return Error(interaction, "Le mode anti bot est déjà activé !")

                    data.Bot = true
                    data.save();
                }

                return Success(interaction, "Le mode anti bot est maintenant activer !")
            }

            if(choices === "off") {
                if(!data || data.Bot === false || !data && data.Bot === false) return Error(interaction, "Le mode anti bot est déjà désactivé !")

                data.Bot = false
                data.save();

                return Success(interaction, "Le mode anti bot est maintenant désactiver !")
            }
        }

        if(options.getSubcommand() === "spam") {
            const choices = options.getString("état")

            if(choices === "on") {
                if(!data) {
                    new config({
                        Guild: guild.id,
                        Spam: true
                    }).save();
                }

                if(data) {
                    if(data.Spam === true) return Error(interaction, "Le mode anti spam est déjà activé !")

                    data.Spam = true
                    data.save();
                }

                return Success(interaction, "Le mode anti spam est maintenant activer !")
            }

            if(choices === "off") {
                if(!data || data.Spam === false || !data && data.Spam === false) return Error(interaction, "Le mode anti spam est déjà désactivé !")

                data.Spam = false
                data.save();

                return Success(interaction, "Le mode anti spam est maintenant désactiver !")
            }
        }

        if(options.getSubcommand() === "mass-ping") {
            const choices = options.getString("état")

            if(choices === "on") {

                if(!data) {
                    new config({
                        Guild: guild.id,
                        MassPing: true
                    }).save();
                }

                if(data) {
                    if(data.MassPing === true) return Error(interaction, "Le mode anti mass ping est déjà activé !")

                    data.MassPing = true
                    data.save();
                }

                return Success(interaction, "Le mode anti mass ping est maintenant activer !")
            }

            if(choices === "off") {
                if(!data || data.MassPing === false || !data && data.MassPing === false) return Error(interaction, "Le mode anti mass ping est déjà désactivé !")

                data.MassPing = false
                data.save();

                return Success(interaction, "Le mode anti mass ping est maintenant désactiver !")
            }
        }

        if(options.getSubcommand() === "lien") {
            const choices = options.getString("état")

            if(choices === "on") {

                if(!data) {
                    new config({
                        Guild: guild.id,
                        Link: true
                    }).save();
                }

                if(data) {
                    if(data.Link === true) return Error(interaction, "Le mode anti lien est déjà activé !")

                    data.Link = true
                    data.save();
                }

                return Success(interaction, "Le mode anti lien est maintenant activer !")
            }

            if(choices === "off") {
                if(!data || data.Link === false || !data && data.Link === false) return Error(interaction, "Le mode anti lien est déjà désactivé !")

                data.Link = false
                data.save();

                return Success(interaction, "Le mode anti lien est maintenant désactiver !")
            }
        }

        if(options.getSubcommand() === "channel-delete") {
            const choices = options.getString("état")

            if(choices === "on") {

                if(!data) {
                    new config({
                        Guild: guild.id,
                        channelDelete: true
                    }).save();
                }

                if(data) {
                    if(data.channelDelete === true) return Error(interaction, "Le mode anti suppression de salon est déjà activé !")

                    data.channelDelete = true
                    data.save();
                }

                return Success(interaction, "Le mode anti suppression de salon est maintenant activer !")
            }

            if(choices === "off") {
                if(!data || data.channelDelete === false || !data && data.channelDelete === false) return Error(interaction, "Le mode anti suppression de salon est déjà désactivé !")

                data.channelDelete = false
                data.save();

                return Success(interaction, "Le mode anti suppression de salon est maintenant désactiver !")
            }
        }

        if(options.getSubcommand() === "channel-create") {
            const choices = options.getString("état")

            if(choices === "on") {
                if(!data) {
                    new config({
                        Guild: guild.id,
                        channelCreate: true
                    }).save();
                }

                if(data) {
                    if(data.channelCreate === true) return Error(interaction, "Le mode anti création de salon est déjà activé !")

                    data.channelCreate = true
                    data.save();
                }

                return Success(interaction, "Le mode anti création de salon est maintenant activer !")
            }

            if(choices === "off") {
                if(!data || data.channelCreate === false || !data && data.channelCreate === false) return Error(interaction, "Le mode anti création de salon est déjà désactivé !")

                data.channelCreate = false
                data.save();

                return Success(interaction, "Le mode anti création de salon est maintenant désactiver !")
            }
        }

        if(options.getSubcommand() === "everyone") {
            const choices = options.getString("état")

            if(choices === "on") {
                if(!data) {
                    new config({
                        Guild: guild.id,
                        everyone: true
                    }).save();
                }

                if(data) {
                    if(data.everyone === true) return Error(interaction, "Le mode anti everyone/here est déjà activé !")

                    data.everyone = true
                    data.save();
                }

                return Success(interaction, "Le mode anti everyone/here est maintenant activer !")
            }

            if(choices === "off") {
                if(!data || data.everyone === false || !data && data.everyone === false) return Error(interaction, "Le mode anti everyone/here est déjà désactivé !")

                data.everyone = false
                data.save();

                return Success(interaction, "Le mode anti everyone/here est maintenant désactiver !")
            }
        }
    }
}