const {  EmbedBuilder, ApplicationCommandType } = require("discord.js");

module.exports = {
    name: "Calin",
    permissions: ["UseApplicationCommands"],
    category: "⚙️ Context",
    type: ApplicationCommandType.User,
    async execute(client, interaction) {
        const target = await interaction.guild.members.fetch(interaction.targetId)

        var subreddits = require('../../assets/json/hugs.json')
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        if(target.id === interaction.user.id) {
            const embed2 = new  EmbedBuilder()
            .setDescription(`${interaction.user} se fait un gros calin tout seul`)
            .setColor(client.yellow)  
            .setTimestamp()
            .setImage(sub)
            .setFooter({
                text: "Calin",
                iconURL: interaction.user.displayAvatarURL({dynamic: true})
            })

            return interaction.reply({ embeds: [embed2] })     
        }

        if(target.id === client.user.id) {
            const embed2 = new  EmbedBuilder()
            .setDescription(`❤️ ${interaction.user} me fait un gros calin ❤️`)
            .setColor(client.yellow)  
            .setTimestamp()
            .setImage(sub)
            .setFooter({
                text: "Calin",
                iconURL: interaction.user.displayAvatarURL({dynamic: true})
            })

            return interaction.reply({ embeds: [embed2] })     
        }

        const embed1 = new  EmbedBuilder()
            .setDescription(`${interaction.user} donne un gros calin à ${target}`)
            .setColor(client.yellow)  
            .setTimestamp()
            .setImage(sub)
            .setFooter({
                text: "Calin",
                iconURL: interaction.user.displayAvatarURL({dynamic: true})
            })

        interaction.reply({ embeds: [embed1] })     
    }
}