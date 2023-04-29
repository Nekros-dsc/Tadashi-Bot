const { EmbedBuilder, ApplicationCommandType } = require("discord.js");

module.exports = {
    name: "Frapper",
    permissions: ["UseApplicationCommands"],
    category: "⚙️ Context",
    type: ApplicationCommandType.User,
    async execute(client, interaction) {
        const target = await interaction.guild.members.fetch(interaction.targetId)

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