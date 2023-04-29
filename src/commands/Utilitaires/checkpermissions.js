const { PermissionsBitField, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")

module.exports = {
	name: "checkpermissions",
	description: "Permet de vérifier vos permissions ou celles d'un utilisateur",
	usage: "/checkpermissions `(user: utilisateur)`",
	example: "/checkpermissions",
	category: "⚙️ Utilités",
	permissions: ["UseApplicationCommands"],
	options: [
		{
			name: "user",
			description: "Utilisateur",
			type: ApplicationCommandOptionType.User,
			required: false
		}
	],
	async execute(client, interaction) {
		const member = await interaction.guild.members.fetch(interaction.options.getMember("user") || interaction.user.id)

		const Replied = await interaction.reply({
			content: null, embeds: [
				new EmbedBuilder()
					.setTitle(" Chargement...")
					.setColor("#c500ff")
			], fetchReply: true
		})
		const embed2 = new EmbedBuilder()
			.setTitle(`Permissions de ${member.user.tag}`)
			.setDescription(`**Voir les salons : ${member.permissions.has(PermissionsBitField.Flags.ViewChannel) ? "✅" : "❌"}\nGérer les salons : ${member.permissions.has(PermissionsBitField.Flags.ManageChannels) ? "✅ " : "❌"}\nGérer les rôles : ${member.permissions.has(PermissionsBitField.Flags.ManageRoles) ? "✅ " : "❌"}\nGérer les émojis et les autocollants : ${member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers) ? "✅ " : "❌"}\nVoir les logs du serveur : ${member.permissions.has(PermissionsBitField.Flags.ViewAuditLog) ? "✅ " : "❌"}\nVoir les analyses de serveur : ${member.permissions.has(PermissionsBitField.Flags.ViewGuildInsights) ? "✅ " : "❌"}\nGérer les webhooks : ${member.permissions.has(PermissionsBitField.Flags.ManageWebhooks) ? "✅ " : "❌"}\nGérer le serveur : ${member.permissions.has(PermissionsBitField.Flags.ManageGuild) ? "✅ " : "❌"}\nCréer une invitation : ${member.permissions.has(PermissionsBitField.Flags.CreateInstantInvite) ? "✅ " : "❌"}\nChanger le pseudo : ${member.permissions.has(PermissionsBitField.Flags.ChangeNickname) ? "✅ " : "❌"}\nGérer les pseudos : ${member.permissions.has(PermissionsBitField.Flags.ManageNicknames) ? "✅ " : "❌"}\nExpulser des membres : ${member.permissions.has(PermissionsBitField.Flags.KickMembers) ? "✅ " : "❌"}\nBannir des membres : ${member.permissions.has(PermissionsBitField.Flags.BanMembers) ? "✅ " : "❌"}\nExclure temporairement des membres : ${member.permissions.has(PermissionsBitField.Flags.ModerateMembers) ? "✅ " : "❌"}\nEnvoyer des messages : ${member.permissions.has(PermissionsBitField.Flags.SendMessages) ? "✅ " : "❌"}\nEnvoyer des messages dans les fils : ${member.permissions.has(PermissionsBitField.Flags.SendMessagesInThreads) ? "✅ " : "❌"}\nCréer des fils public : ${member.permissions.has(PermissionsBitField.Flags.CreatePublicThreads) ? "✅ " : "❌"}\nCréer des fils privés : ${member.permissions.has(PermissionsBitField.Flags.CreatePrivateThreads) ? "✅ " : "❌"}\nIntégrer des liens : ${member.permissions.has(PermissionsBitField.Flags.EmbedLinks) ? "✅ " : "❌"}\nJoindre des fichiers :${member.permissions.has(PermissionsBitField.Flags.AttachFiles) ? "✅ " : "❌"}\nAjouter des réactions : ${member.permissions.has(PermissionsBitField.Flags.AddReactions) ? "✅ " : "❌"}\nUtiliser des émojis externes : ${member.permissions.has(PermissionsBitField.Flags.UseExternalEmojis) ? "✅ " : "❌"}\nUtiliser des autocollants externes : ${member.permissions.has(PermissionsBitField.Flags.UseExternalStickers) ? "✅ " : "❌"}\nMentionner @everyone, @here et tous les rôles : ${member.permissions.has(PermissionsBitField.Flags.MentionEveryone) ? "✅ " : "❌"}\nGérer les messages : ${member.permissions.has(PermissionsBitField.Flags.ManageMessages) ? "✅ " : "❌"}\nGérer les fils : ${member.permissions.has(PermissionsBitField.Flags.ManageThreads) ? "✅ " : "❌"}\nVoir les anciens messages : ${member.permissions.has(PermissionsBitField.Flags.ReadMessageHistory) ? "✅ " : "❌"}\nUtiliser les commandes de l'application : ${member.permissions.has(PermissionsBitField.Flags.UseApplicationCommands) ? "✅ " : "❌"}\nSe connecter : ${member.permissions.has(PermissionsBitField.Flags.Connect) ? "✅" : "❌"}\nParler : ${member.permissions.has(PermissionsBitField.Flags.Speak) ? "✅" : "❌"}\nUtiliser les Activités : ${member.permissions.has(PermissionsBitField.Flags.UseEmbeddedActivities) ? "✅" : "❌"}\nVoix prioritaire : ${member.permissions.has(PermissionsBitField.Flags.PrioritySpeaker) ? "" : "❌"}\nAdministrateur : ${member.permissions.has(PermissionsBitField.Flags.Administrator) ? "✅ " : "❌"}**`)
			.setFooter({
				text: client.footer,
				iconURL: client.user.displayAvatarURL()
			})
			.setColor(client.color)

		Replied.edit({ embeds: [embed2] })
	}
}