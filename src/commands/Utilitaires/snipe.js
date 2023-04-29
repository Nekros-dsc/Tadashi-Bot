const Discord = require("discord.js")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "snipe",
    description: "Permet de voir le dernier message supprimé dans le salon",
    permissions: ["UseApplicationCommands"],
    usage: "/snipe",
    example: "/snipe",
    dm: false,
    category: "Fun",

    async execute(client, message, args) {
        
        const msg = client.snipes.get(message.channel.id)

    if(!msg) return message.channel.send("Aucun message enregistré.")

        const Embed = new EmbedBuilder()
        .setColor(client.color)
        .setTitle(`${msg.author.tag}`)
        .setDescription(msg.content)

        await message.reply({embeds: [Embed]})
    }
}