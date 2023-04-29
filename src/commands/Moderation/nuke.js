const { ApplicationCommandOptionType, PermissionsBitField, ChannelType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "nuke",
    permissions: ["ManageChannels"],
    usage: "/nuke `(channel: #channel)",
    example: "/nuke `(channel: #général)`",
    category: "🔨 Modération",
    description: "Supprime un salon puis recréer le salon (clône le salon)",
    options: [
      {
        name: "channel",
        description: "Salon",
        type: ApplicationCommandOptionType.Channel,
        channelTypes: [ChannelType.GuildText],
        required: false
      }
    ],
    async execute(client, interaction) {
        const channel = interaction.options.getChannel("channel") || interaction.channel
        const clone_channel = await channel.clone()
        clone_channel.send({ embeds: [new EmbedBuilder().setDescription(`Salon recréé par ${interaction.user}.`).setColor(client.color)] }).then(repliedMessage => {
          setTimeout(() => repliedMessage.delete(), 10000);
        });
        channel.delete()
    }
  }