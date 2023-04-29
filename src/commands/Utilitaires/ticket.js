const { EmbedBuilder, ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
const ticketData = require('../../models/ticket')
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
     name: "ticket",
     description: "Options de ticket",
     usage: "/ticket",
     example: "/ticket",
     category: "⚙️ Utilités",
     permissions: ["UseApplicationCommands"],
     options: [
         {
             name: "add",
             description: "Ajout un membre dans le ticket",
             type: ApplicationCommandOptionType.Subcommand,
             options: [
                 {
                     name: "user",
                     description: "Utilisateur",
                     type: ApplicationCommandOptionType.User,
                     required: true
                 }
             ],
         }
     ],
     async execute(client, interaction) {
         const { guild, channel, options } = interaction;
         const user = interaction.options.getUser("user") 

         const data = await ticketData.findOne({ Guild: guild.id, channelId: channel.id })

         if(!data) return Error(interaction, "Ce salon n'est pas un ticket")

         if(interaction.user.id !== data.memberId) return Error(interaction, "Vous n'êtes pas autoriser à ajouter un utilisateur dans ce ticket car nous n'êtes pas le propriétaire du ticket !")
        
         if(options.getSubcommand() === "add") {
             await channel.permissionOverwrites.edit(
                 [
                     {
                         id: user.id,
                         allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                     }
                 ]
             )
    
             return Success(interaction, `${target.user} a été ajouté au ticket avec succès !`)
         }
     }
 };