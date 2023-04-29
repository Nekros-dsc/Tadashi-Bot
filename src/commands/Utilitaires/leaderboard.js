const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const levelDB = require('../../models/Level')
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
    name: "leaderboard",
    description: "Permet de voir les 10 premiers membres riches en XP",
    usage: "/leaderboard `(user: utilisateur)`",
    example: "/leaderboard `(user: @drixerex)`",
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
        const { guild } = interaction

        let text = ""

        const Data = await levelDB.find({ Guild: guild.id })
            .sort({
                XP: -1,
                Level: -1
            })
            .limit(10)
            .catch(err => {})

        if (!Data) return Error(interaction, `Personne dans le leaderboard !`)

        const Replied = await interaction.reply({ content: null, embeds: [
            new EmbedBuilder()
                .setTitle("Chargement...")
                .setColor("#c500ff")
        ], fetchReply: true })

        for (let counter = 0; counter < Data.length; ++counter) {
            const { User, XP, Level = 0 } = Data[counter]
            
            const Member = guild.members.cache.get(User)

            let MemberTag

            if(Member) MemberTag = Member.user.tag
            else MemberTag = "Inconnu"

            let shortXp = shorten(XP)

            text += `${counter + 1}. **${MemberTag}** | XP : **${shortXp}** | Niveau : **${Level}**\n`
        }

        Replied.edit({ content: null, embeds: [
            new EmbedBuilder()
                .setTitle("Les 10 premiers membres riches en XP")
                .setDescription(`${text}`)
                .setColor(client.color)
        ] })
            
    }
};

function shorten(count) {
    const ABBRS = ["", "k", "M", "T"]

    const i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000))

    let result = parseFloat((count / Math.pow(1000, i)).toFixed(2))
    result += `${ABBRS[i]}`
    
    return result
}