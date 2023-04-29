const { ApplicationCommandOptionType } = require("discord.js");
const { Success } = require('../../utils/Success')

module.exports = {
    name: "massrole",
    description: "Permet d'ajouter ou supprimer des rôles à tous les membres",
    usage: "/massrole add `[role: rôle]`\n/massrole remove `[role: rôle]`",
    example: "/massrole add `[role: Membre]`",
    category: "🔨 Modération",
    permissions: ["ManageRoles"],
    options: [
        {
            name: "add",
            description: "Ajoute un rôle à tous les membres",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "role",
                    description: "Rôle",
                    type: ApplicationCommandOptionType.Role,
                    required: true
                }
            ]
        },
        {
            name: "remove",
            description: "Retire un rôle à tous les membres",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "role",
                    description: "Rôle",
                    type: ApplicationCommandOptionType.Role,
                    required: true
                }
            ]
        }
    ],
    async execute(client, interaction) {
        if(interaction.options.getSubcommand() === "add") {
            const role = interaction.options.getRole("role")

            const Members = interaction.guild.members.cache.filter(m => !m.user.bot)

            Success(interaction, `Je suis entrain d'ajouter le rôle ${role} à tous les membres ! Ceci peut prendre du temps si il y'a beaucoup de membres dans ce serveur !`)
            try{
                Members.forEach(m => m.roles.add(role)) 
            } catch(err) {
                Error(interaction, "Une erreur est survenue !")
            }
        }

        if(interaction.options.getSubcommand() === "remove") {
            const role = interaction.options.getRole("role")

            const Members = interaction.guild.members.cache.filter(m => !m.user.bot)

            Success(interaction, `Je suis entrain de supprimer le rôle ${role} à tous les membres ! Ceci peut prendre du temps si il y'a beaucoup de membres dans ce serveur !`)
            try{
                Members.forEach(m => m.roles.remove(role)) 
            } catch(err) {
                Error(interaction, "Une erreur est survenue !")
            }
        }
    }
};