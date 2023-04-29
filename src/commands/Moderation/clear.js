const { ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
    name: "clear",
    description: "Efface des messages avec le nombre choisi",
    usage: "/clear `[nombre: nombre]`",
    example: "/clear `[nombre: 25]`",
    category: "🔨 Modération",
    permissions: ["ManageMessages"],
    options: [
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
        const amountToDelete = interaction.options.getNumber("nombre")

        try {
            await interaction.channel.bulkDelete(amountToDelete, true).then(messages => {
                Success(interaction, `C'est fait ! J'ai supprimé ${messages.size} messages !`)
            })
        } catch (err) {
            let messages = [...(await interaction.channel.messages.fetch()).values()].filter(async m => m.createdAt <= 1209600000)
            if(messages.length <= 0) return Error(interaction, "Je ne peux pas supprimer ces messages car elles dataient de plus de \`14 jours\` !")
            await interaction.channel.bulkDelete(messages)
            Success(interaction, `J'ai réussi à supprimé que ${messages.size} messages, car les autres messages dataient de plus de \`14 jours\``)
        }
    }
}