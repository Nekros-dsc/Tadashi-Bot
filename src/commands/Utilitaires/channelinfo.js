const { EmbedBuilder, ApplicationCommandOptionType, ChannelType } = require('discord.js');

module.exports = {
    name: "channelinfo",
    description: "Affiche les informations d'un salon",
    usage: "/channelinfo `(channel: #salon)`",
    example: "/channelinfo `(channel: #général)`",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    options: [
        {
            name: "channel",
            description: "Salon",
            type: ApplicationCommandOptionType.Channel,
            channelTypes: [ChannelType.GuildText, ChannelType.GuildAnnouncement],
            required: false
        }
    ],
    async execute(client, interaction) {
        const channel = interaction.options.getChannel("channel") || interaction.channel;

        const Replied = await interaction.reply({ content: "Chargement...", fetchReply: true })

        const channelTypes = {
            GUILD_TEXT: 'text',
            DM: 'DM',
            GUILD_VOICE: 'Voice',
            GROUP_DM: 'Group DM',
            GUILD_CATEGORY: 'Category',
            GUILD_NEWS: 'News/Announcement',
            GUILD_NEWS_THREAD: 'News Thread',
            GUILD_PUBLIC_THREAD: 'Public Thread',
            GUILD_PRIVATE_THREAD: 'Private Thread',
            GUILD_STAGE_VOICE: 'Stage Voice',
            GUILD_DIRECTORY: 'Hub Directory',
            GUILD_FORUM: 'Forum',
        }

        const embed = new EmbedBuilder()
            .setAuthor({ name: "Informations sur le salon", iconURL: `${client.user.displayAvatarURL()}`})
            .addFields(
                {
                    name: "➔ Informations",
                    value: `
                    > **\`•\` Nom du salon :** ${channel} \`${channel.name}\`
                    > **\`•\` Description :** \`${channel.topic || "Pas de description"}\`
                    > **\`•\` ID :** \`${channel.id}\`
                    > **\`•\` Catégorie :** \`${channel.parentId ? `${channel.parent.name}` : "Pas de category"}\`
                    > **\`•\` Type :** \`${channelTypes[channel.type] || "Pas de type"}\`
                    > **\`•\` Position :** \`${channel.position}\`
                    > **\`•\` NSFW :** \`${channel.nsfw ? "Oui" : "Non"}\`
                    > **\`•\` Date de création :** <t:${parseInt(channel.createdTimestamp / 1000)}:R>
                    `,
                    inline: false
                }
            )
            .setTimestamp()
            .setColor(client.color)

        Replied.edit({ content: null, embeds: [embed] })
    }
}