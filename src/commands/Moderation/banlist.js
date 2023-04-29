const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Error } = require('../../utils/Error')

module.exports = {
  name: "banlist",
  description: "Envoie la liste des utilisateurs bannis",
  usage: `/banlist`,
  example: "/banlist",
  category: "🔨 Modération",
  permissions: ["ManageMessages"],
  async execute(client, interaction) {
    const fetchBans = await interaction.guild.bans.fetch();
  
    const banlist = (await fetchBans).map((member) => member.user.tag).join(`,\n> `)

    if (banlist.length < 1) return Error(interaction, "Il n'y a pas de personnes banni(s) dans ce serveur !")

    const Replied = await interaction.reply({ content: "Chargement...", fetchReply: true })

    const embed = new EmbedBuilder()
      .setTitle("Utilisateur(s) banni(s)")
      .setDescription(`> ${banlist}`)
      .setColor(client.color)

    Replied.edit({ content: null, embeds: [embed] })
  }
}