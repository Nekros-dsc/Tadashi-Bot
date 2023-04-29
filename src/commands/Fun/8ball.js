const {  EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "8ball",
    permissions: ["UseApplicationCommands"],
    usage: "/8ball `[question: question]`",
    example: "/8ball `[question: Est-ce que Tadashi est le meilleur bot ?]`",
    category: "🥳 Fun",
    description: "Permet de poser une question est le bot répond aléatoirement",
    options: [
        {
            name: "question",
            description: "Question",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async execute(client, interaction) {
        replies = ['Absolument !', 'Vraiment pas !', 'Je sais pas mais je pense que c\'est vrai.', 'Si ce serait vrai je me serais suicider !', 'Sur la parole d\'un bot que c\'est faux.', 'Laissez moi tranquille j\'rentre pas dans vos embrouilles !', 'Comment on dit non en allemand ?', 'C\'est une légende ça non ?', 'C\'est pas une question ça tellement c\'est évident que oui !', 'C\'est exactement ce que j\'allais dire !', 'jsp', 'je sais ap jte jure', "je sais pas", "i dont know", "l'argent c'est important"]
        question = interaction.options.getString("question")
               
        const embed3 = new EmbedBuilder()
            .addFields(
                { name: "Question", value: `${question}` },
                { name: "Réponse", value: `${replies[Math.floor(Math.random() * replies.length)]}` },
            )
            .setFooter({
                text: "8ball",
                iconURL: interaction.user.displayAvatarURL({dynamic: true})
            })  
            .setColor(client.color)  
            .setTimestamp()

        interaction.reply({ embeds: [embed3] })       
    }
}