const {  EmbedBuilder, ActionRowBuilder, ApplicationCommandOptionType, SelectMenuBuilder } = require("discord.js");
const { Error } = require('../../utils/Error')

const selects = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId('help')
            .setPlaceholder("Selectionner les types de commandes")
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions([
                {
                    label: "🏠 Accueil",
                    description: "Permet de vous rediriger sur la page d'accueil",
                    value: "help-home"
                },
                {
                    label: "🔨 Modération",
                    description: "Permet de vous rediriger sur la page des commandes de modération",
                    value: "help-admin"
                },
                {
                    label: "⚙️ Utilités",
                    description: "Permet de vous rediriger sur la page des commandes d'utilitaires",
                    value: "help-utility"
                },
                {
                    label: "🥳 Fun",
                    description: "Permet de vous rediriger sur la page des commandes de fun",
                    value: "help-fun"
                }
            ])
    )

module.exports = {
    name: "help",
    description: "Affiche les informations des commandes",
    usage: "/help `(cmd: commande)`",
    example: "/help `(cmd: ping)`",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    options: [
        {
            name: "cmd",
            description: "Commande",
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    async execute(client, interaction) {
        const cmdName = interaction.options.getString("cmd")

        if (!cmdName){
            const noArgs = new EmbedBuilder() 
                .setTitle("🏠 Accueil")
                .setDescription(`- Utiliser \`/help (commande: commande)\` pour voir les détails d'une commande.\n- Nombre de commandes disponible : \`${client.commands.size}\`\n\n**-> Veuillez utiliser le sélécteur ci-dessous pour accéder aux commandes :**`)
                .setFooter({
                    text: "help",
                    iconURL: interaction.user.displayAvatarURL({dynamic: true})
                })
                .setColor(client.color)
                .setTimestamp()


            return interaction.reply({ embeds: [noArgs], components: [selects] })
        }

        const cmd = client.commands.get(cmdName)


        if (!cmd) return Error(interaction, "Cette commande n'existe pas !")
        
        const argsEmbed = new EmbedBuilder()
            .setTitle(`Commande : ${cmd.name}`)
            .setDescription(
                `
                > \`•\` **Nom de la commande :** ${cmd.name}
                > \`•\` **Description de la commande :** ${cmd.description}
                > \`•\` **Usage de la commande :** ${cmd.usage}
                > \`•\` **Exemple(s) de la commande :** ${cmd.example}
                `
            )
            .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true}) })
            .setColor(client.color)
            .setFooter({
                text: `Help : ${cmd.name}`,
                iconURL: interaction.user.displayAvatarURL({dynamic: true})
            })
            .setTimestamp()
            
        return interaction.reply({ content: null, embeds: [argsEmbed] })
    }
} 

