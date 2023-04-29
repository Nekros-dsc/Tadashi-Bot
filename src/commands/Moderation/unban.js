const { ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
    name: "unban",
    description: "Unban un utilisateur avec l'identifiant de l'utilisateur",
    usage: "/unban `[id: id de l'utilisateur]`",
    example: "/unban `[id: 923969347276398653]`",
    category: "🔨 Modération",
    permissions: ["BanMembers"],
    options: [
        {
            name: "id",
            description: "Identifiant de l'utilisateur",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async execute(client, interaction) {
        const userId = interaction.options.getString("id")

        interaction.guild.members.unban(userId).then((user) => {
            Success(interaction, `Le membre ${user.tag} a été débanni avec succès !`)
        }).catch(() => {
            Error(interaction, "Je n'ai pas trouvé l'identifiant que vous m'avez donner dans la liste des bannis !")
        })
    }
}