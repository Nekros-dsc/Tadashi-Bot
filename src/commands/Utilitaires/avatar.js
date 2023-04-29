const {  EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Affiche l'avatar d'un utilisateur",
    usage: "/avatar `(user: @utilisateur)`",
    example: "/avatar @drixerex",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    options: [
        {
            name: "user",
            description: "Utilisateur",
            type: ApplicationCommandOptionType.User,
            required: false
        },
        {
            name: "taille",
            description: "Taille de l'avatar",
            type: ApplicationCommandOptionType.String,
            required: false,
            choices: [
                {
                    name: "128x128",
                    value: "128"
                },
                {
                    name: "256x256",
                    value: "256"
                },
                {
                    name: "512x512",
                    value: "512"
                },
                {
                    name: "1024x1024",
                    value: "1024"
                },
                {
                    name: "2048x2048",
                    value: "2048"
                },
                {
                    name: "4096x4096",
                    value: "4096"
                }
            ]
        }
    ],
    async execute(client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.options.getMember("user") || interaction.user.id)
        const taille = interaction.options.getString("taille")

        const embed = new  EmbedBuilder()
            .setTitle(`Avatar de ${member.user.tag}`)
            .setImage(member.user.displayAvatarURL({dynamic: true, size: parseInt(taille) || 4096}))
            .setDescription(`[Lien direct](${member.user.displayAvatarURL()})`)
            .setFooter({
                text: "Le vol de photo de profile peut être sanctionné par un modérateur !"
            })
            .setColor(client.color)

        interaction.reply({ embeds: [embed] })
    }
}