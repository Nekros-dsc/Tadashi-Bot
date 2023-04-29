const { ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');

module.exports = {
    name: "emojify",
    permissions: ["UseApplicationCommands"],
    usage: "/emojify `[text: texte]`",
    example: "/emojify `[text: Salut !]`",
    category: "🥳 Fun",
    description: "Permet de transformer des phrases en émojis",
    options: [
        {
            name: "text",
            description: "Texte",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async execute(client, interaction) {
        const specialCodes = {
            '0': ':zero:',
            '1': ':one:',
            '2': ':two:',
            '3': ':three:',
            '4': ':four:',
            '5': ':five:',
            '6': ':six:',
            '7': ':seven:',
            '8': ':eight:',
            '9': ':nine:',
            '#': ':hash:',
            '*': ':asterisk:',
            '?': ':grey_question:',
            '!': ':grey_exclamation:',
            ' ': '   '
          }

        const string = interaction.options.getString("text")

        const text = string.toLowerCase().split('').map(letter => {
            if(/[a-z]/g.test(letter)) {
                return `:regional_indicator_${letter}:`
            } else if (specialCodes[letter]) {
                return `${specialCodes[letter]}`
            }
            return letter;
        }).join('');

        interaction.reply(text)  
    }
}