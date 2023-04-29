const { ApplicationCommandOptionType, ChannelType } = require("discord.js");
const ms = require("ms");
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
    name: "giveaway",
    description: "Permet de lancer un giveaway",
    usage: "/giveaway",
    example: "/giveaway",
    category: "🔨 Modération",
    permissions: ["ModerateMembers"],

    options: [
        {
            name: "start",
            description: "Lancer un giveaway",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "temps",
                    description: "Le temps du giveaway (1m, 1h, 1d)",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "gagnant",
                    description: "Le nombre de gagnant",
                    type: ApplicationCommandOptionType.Number,
                    required: true
                },
                {
                    name: "prix",
                    description: "Prix du giveaway",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "salon",
                    description: "Salon du giveaway (facultatif)",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required: false
                }
            ],
        },
        {
            name: "end",
            description: "Arrête un giveaway",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "message_id",
                    description: "ID du message",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: "pause",
            description: "Met en pause un giveaway",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "message_id",
                    description: "ID du message",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: "unpause",
            description: "Arrête le pause d'un giveaway",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "message_id",
                    description: "ID du message",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: "reroll",
            description: "Reroll un giveaway",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "message_id",
                    description: "ID du message",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: "delete",
            description: "Supprime un giveaway",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "message_id",
                    description: "ID du message",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ],
    async execute(client, interaction) {
        if(interaction.options.getSubcommand() === 'start') {
            const gChannel = interaction.options.getChannel("salon") || interaction.channel;
            const duration = interaction.options.getString("temps")
            const winnerCount = interaction.options.getNumber("gagnant")
            const prize = interaction.options.getString("prix")
            
            if(!duration.endsWith("s") && !duration.endsWith("h") && !duration.endsWith("d") && !duration.endsWith("m")) return Error(interaction, "La durée du mute n'est pas le bon format !\n\n*Aide :*\n> Jours : `d`\n> Heures : `h`\n> Minutes : `m`\n> Secondes : `s`")

            if(winnerCount < 1) return Error(interaction, "Le nombre de gagnant doit être supérieur ou égal à 1 !")

            client.giveawaysManager.start(gChannel, {
                duration: ms(duration),
                winnerCount,
                prize,
                messages: {
                    giveaway: "🎉 **Nouveau giveaway** ! 🎉",
                    giveawayEnded: "**Giveaway terminé**",
                    winMessage: "Bravo {winners} ! Tu as gagné {this.prize}",
                }
            }).then(
                Success(interaction, "Le giveaway a été créer avec succès !")
            )
        }

        if(interaction.options.getSubcommand() === "end") {
            const messageID = interaction.options.getString("message_id")

            const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageID)

            if(!giveaway) return Error(interaction, `Il n'y a pas de giveaway avec l'ID du message ${messageID} !`)

            client.giveawaysManager.end(messageID).then(() => {
                return Success(interaction, "Le giveaway a été terminer avec succès !")
            }).catch(err => {
                return Error(interaction, "Une erreur est survenu, veuillez contactez notre équipe.")
            })
        }

        if(interaction.options.getSubcommand() === "pause") {
            const messageID = interaction.options.getString("message_id")

            const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageID)

            if(!giveaway) return Error(interaction, `Il n'y a pas de giveaway avec l'ID du message ${messageID} !`)

            client.giveawaysManager.pause(messageID).then(() => {
                return Success(interaction, `Le giveaway a été mis en pause avec succès !`)
            }).catch(err => {
                return Error(interaction, "Une erreur est survenu, veuillez contactez notre équipe.")
            })
        }

        if(interaction.options.getSubcommand() === "unpause") {
            const messageID = interaction.options.getString("message_id")

            const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageID)

            if(!giveaway) return Error(interaction, `Il n'y a pas de giveaway avec l'ID du message ${messageID} !`)

            client.giveawaysManager.unpause(messageID).then(() => {
                return Success(interaction, `Le giveaway a été repris avec succès !`)
            }).catch(err => {
                return Error(interaction, "Une erreur est survenu, veuillez contactez notre équipe.")
            })
        }

        if(interaction.options.getSubcommand() === "reroll") {
            const messageID = interaction.options.getString("message_id")

            const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageID)

            if(!giveaway) return Error(interaction, `Il n'y a pas de giveaway avec l'ID du message ${messageID} !`)

            client.giveawaysManager.reroll(messageID).then(() => {
                return Success(`Le giveaway a été reroll avec succès !`)
            }).catch(err => {
                return Error(interaction, "Une erreur est survenu, veuillez contactez notre équipe.")
            })
        }

        if(interaction.options.getSubcommand() === "delete") {
            const messageID = interaction.options.getString("message_id")

            const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageID)

            if(!giveaway) return Error(interaction, `Il n'y a pas de giveaway avec l'ID du message ${messageID} !`)

            client.giveawaysManager.delete(messageID).then(() => {
                return Success(`Le giveaway a été supprimer avec succès !`)
            }).catch(err => {
                return Error(interaction, "Une erreur est survenu, veuillez contactez notre équipe.")
            })
        }
    }
};