const { ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
    name: "unmute",
    permissions: ["ModerateMembers"],
    usage: "/unmute `[user: @utilisateur]`",
    example: "/unmute `[user: @drixerex]`",
    category: "🔨 Modération",
    description: "Unmute un utilisateur",
    options: [
      {
        name: "user",
        description: "utilisateur",
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ],
    async execute(client, interaction) {
      const target = interaction.options.getMember("user")

      if (!target.isCommunicationDisabled()) return Error(interaction, "Ce membre ne peut pas être démute car il n'est pas mute !")

      target.timeout(null);
      Success(interaction, "Ce membre a bien été unmute !")
    }
}