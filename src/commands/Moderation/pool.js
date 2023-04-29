const { ApplicationCommandOptionType, EmbedBuilder, MessageFlagsBitField } = require("discord.js");
const channelData = require('../../models/poolChannel')
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
    name: "pool",
    description: "Permet de faire un sondage dans ce serveur",
    usage: "/pool `[sondage: sondage]`",
    example: "/pool `[sondage: Inviter Tadashi]`",
    category: "🔨 Modération",
    permissions: ["UseApplicationCommands", "ModerateMembers"],
    options: [
        {
            name: "sondage_1",
            description: "La première proposition",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "sondage_2",
            description: "La deuxième proposition",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "sondage_3",
            description: "La troisième proposition",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "sondage_4",
            description: "La quatrième proposition",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "sondage_5",
            description: "La cinquième proposition",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "sondage_6",
            description: "La sixième proposition",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    async execute(client, interaction) {
        const { options } = interaction;

        const pool1 = options.getString("sondage_1");
        const pool2 = options.getString("sondage_2");
        const pool3 = options.getString("sondage_3");
        const pool4 = options.getString("sondage_4");
        const pool5 = options.getString("sondage_5");
        const pool6 = options.getString("sondage_6");

        const channelData1 = await channelData.findOne({ Guild: interaction.guild.id })
        if(!channelData1) return Error(interaction, "La configuration des sondages n'est pas configurer, merci de faire la commande slash `/config pool` de Tadashi !")
        const channel = interaction.guild.channels.cache.get(channelData1.channelId)
        if(!channel) return Error(interaction, "Le salon est invalide !")
        const role = interaction.guild.roles.cache.get(channelData1.role) 
        if(!role) return Error(interaction, "Le rôle est invalide !")
        
        const embed = new EmbedBuilder()
            .setTitle("Sondage !")
            .setDescription(
                `
                **Pour voter, intéragissez avec la réaction qui correspond au sondage :**

                > 1️⃣ - ${pool1}
                > 2️⃣ - ${pool2}
                > ${pool3 ? "3️⃣ - " + pool3 : ""}
                > ${pool4 ? "4️⃣ - " + pool4 : ""}
                > ${pool5 ? "5️⃣ - " + pool5 : ""}
                > ${pool6 ? "6️⃣ - " + pool6 : ""}
                `
            )
            .setFooter({
                text: `${interaction.guild.name}`,
                iconURL: `${interaction.guild.iconURL()}`
            })
            .setColor(client.color)
            .setTimestamp()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
        
        const msg = await channel.send({ content: `${role}`, embeds: [embed] })
        msg.react('1️⃣')
        msg.react('2️⃣')
        pool3 ? msg.react('3️⃣') : ''
        pool4 ? msg.react('4️⃣') : ''
        pool5 ? msg.react('5️⃣') : ''
        pool6 ? msg.react('6️⃣') : ''
        return Success(interaction, `[Le sondage](https://discord.com/channels/${interaction.guild.id}/${channel.id}/${msg.id}) a été envoyé avec succès !`)
    }
};