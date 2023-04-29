const {
    ButtonInteraction,
    EmbedBuilder,
    PermissionsBitField,
    Colors,
} = require("discord.js");
const SuggestDB = require("../../models/SuggestDB");
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
    customId: "suggest-accept",
    /**
     * @param {ButtonInteraction} interaction
     */
    async execute(client, interaction) {
        if (!interaction.member.permissions.has("ModerateMembers"))
            return Error(interaction, "Vous n'avez pas la permissions nécessaire pour accepter une suggestion.")

        const { guild, customId, message } = interaction;
        SuggestDB.findOne({ Guild: guild.id, Message: message.id }, async (err, data) => {
            if (err) throw err;
            if (!data)
                return Error(interaction, "Le message n'a pas été trouvé dans la base de données !")
            const Embed = EmbedBuilder.from(message.embeds[0]);
            if (!Embed) return;
            Embed.spliceFields(1, 1,  { name: "Status", value: "Accepter", inline: true, });
            message.edit({
                embeds: [Embed.setColor(Colors.Green)]
            });
            Success(interaction, "Le suggestion a été accepté avec succès !")
        }
        );
    },
};