const {  EmbedBuilder, ActionRowBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, ApplicationCommandOptionType } = require("discord.js");
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
    name: "invite-voice",
    description: "Permet d'inviter quelqu'un dans un vocal",
    usage: "/invite-voice `[user: @utilisateur]`",
    example: "/invite-voice `[user: @drixerex]`",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
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

        const { member } = interaction;

        if(!member.voice.channel) return Error(interaction, "Vous devriez être dans un salon vocal pour inviter votre ami !")

        if(target.user.id === member.user.id) return Error(interaction, "Tu ne peux pas t'inviter toi même !")

        if(target.user.id === client.user.id) return Error(interaction, "C'est gentil, mais je ne peux pas faire grande chose dans le vocal !")

        if(target.user.bot) return Error(interaction, "Je ne peux pas inviter un bot !")

        try {target.send({ embeds: [new EmbedBuilder().setTitle("Psssittt").setDescription(`**${member.user.username}** t'a invité à rejoindre <#${member.voice.channel.id}> !`).setColor(client.color).setTimestamp().setAuthor({ name: `Invitation`, iconURL: `${client.user.displayAvatarURL()}` }).setFooter({ text: `${member.guild.name}` })] })} catch(err) {return Error(interaction, `J'ai essayé tous ce que je pouvais pour MP ${user.username} mais j'ai pas réussi !`)}

        Success(interaction, `J'ai dit à ${target.user.username} que tu l'invite dans <#${member.voice.channel.id}> ! Maintenant faudra attendre que ${target.user.username} rejoint le vocal !`)
    }
};