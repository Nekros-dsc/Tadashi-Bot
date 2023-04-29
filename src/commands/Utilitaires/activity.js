const {  EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle } = require("discord.js");
const { Error } = require('../../utils/Error')
const { Success } = require('../../utils/Success')

module.exports = {
    name: "actvité",
    description: "choisir une activité",
    usage: "/actvité",
    example: "/youtube",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    options: [
        {
            name: "youtube",
            description: "regarder youtube together",
            type: ApplicationCommandOptionType.Subcommand
        }
       
    ],
    async execute(client, interaction) {
        const app = client.discordTogether

        const VC = interaction.member.voice.channel
        if(!VC) return Error(interaction, "Vous devriez être sur salon vocal pour effectuer cette action !")

        if(interaction.options.getSubcommand() === "youtube") {
            app.createTogetherCode(VC.id, "youtube").then(invite => Success(interaction, `Cliquez [ici](${invite.code}) pour avoir accès à l'activité **[YouTube](${invite.code})**`))
        }
       
        
    }
};