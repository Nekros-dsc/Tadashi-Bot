const {  AttachmentBuilder, ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder } = require("discord.js");
const QRCode = require('qrcode');
const { Error } = require('../../utils/Error')

module.exports = {
    name: "qr-code",
    permissions: ["UseApplicationCommands"],
    usage: "/qr-code `[contenu: contenu]`",
    example: "/qr-code `[contenu: https://soon.com/]`",
    category: "⚙️ Utilités",
    description: "Permet de générer un QR-Code",
    options: [
        {
            name: "contenu",
            description: "Contenu du QR-Code",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async execute(client, interaction) {
        const content = interaction.options.getString("contenu")

        if(content.length > 150) return Error(interaction, "Je ne peux pas générer un QR Code avec + de 150 caractères !")

        let image = await QRCode.toBuffer(content)
        const imagex = new AttachmentBuilder(image, { name: "protect.png", size: 4096 })

        const embed = new EmbedBuilder()
            .setAuthor({ name: "QR Code 📷", iconURL: `${client.user.displayAvatarURL()}` })
            .setImage("attachment://protect.png")
            .setColor(client.color)

        interaction.reply({ embeds: [embed], files: [imagex] })   
    }
}