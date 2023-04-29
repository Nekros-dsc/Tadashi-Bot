const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "frapper",
    permissions: ["UseApplicationCommands"],
    usage: "/frapper `[user: @utilisateur]`",
    example: "/frapper `[user: @drixerex]`",
    category: "🥳 Fun",
    description: "Permet de frapper virtuellement un membre",
    options: [
        {
            name: "user",
            description: "Utilisateur",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    async execute(client, interaction) {
        const target = interaction.options.getMember("user")

        var subreddits = require('../../assets/json/slaps.json')
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        if(target.id === client.user.id) {
            return interaction.reply("🥱 Mouais...")   
        }

        if(target.id === interaction.user.id) {
            const embed1 = new  EmbedBuilder()
            .setDescription(`${interaction.user} se donne un gros coup de poing (j'ai pas compris pourquoi)`)
            .setColor(client.yellow)  
            .setTimestamp()
            .setImage(sub)
            .setFooter({
                text: "Frapper",
                iconURL: interaction.user.displayAvatarURL({dynamic: true})
            })

            return interaction.reply({ embeds: [embed1] })    
        }

        const embed1 = new  EmbedBuilder()
            .setDescription(`${interaction.user} donne un gros coup de poing à ${target}`)
            .setColor(client.yellow)  
            .setTimestamp()
            .setImage(sub)
            .setFooter({
                text: "Frapper",
                iconURL: interaction.user.displayAvatarURL({dynamic: true})
            })

        interaction.reply({ embeds: [embed1] })    
    }
}