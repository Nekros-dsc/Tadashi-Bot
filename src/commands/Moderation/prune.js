const { ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
    name: "prune",
    description: "Permet de supprimer des messages d'un utilisateur.",
    usage: "/prune `[user: @utilisateur]` `[nombre: nombre]`",
    example: "/prune `[user: @drixerex]` `[nombre: 25]`",
    category: "🔨 Modération",
    permissions: ["ManageMessages"],
    options: [
        {
            name: "user",
            description: "Utilisateur",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "nombre",
            description: "Nombre de messages à supprimé",
            type: ApplicationCommandOptionType.Number,
            minValue: 0,
            maxValue: 100,
            required: true
        }
    ],
    async execute(client, interaction) {
        const target = interaction.options.getMember("user")
        const amountToDelete = interaction.options.getNumber("nombre")

        if (amountToDelete > 100 || amountToDelete < 1) return Error(interaction, "Le nombre de messages a supprimer doit être supérieur ou égale à 1 !")

        const messagesToDelete = await interaction.channel.messages.fetch();
        let i = 0;
        const filteredTargetMessage = [];
        (await messagesToDelete).filter(msg => {
            if (msg.author.id === target.id && amountToDelete > i) {
                filteredTargetMessage.push(msg); i++;
            }
        });

        await interaction.channel.bulkDelete(filteredTargetMessage, true).then(messages => {
            Success(interaction, `J'ai supprimé ${messages.size} messages de ${target} !`)
        })
    }
}