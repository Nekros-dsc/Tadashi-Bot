const { Client, ChatInputCommandInteraction, ComponentType, ActionRowBuilder, ButtonStyle, ButtonBuilder, EmbedBuilder } = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "pfc",
    description: "Permet de jouer a pierre papier ciseaux",
    permissions: ["UseApplicationCommands"],
    usage: "/rps",
    example: "/rps",
    category: "🥳 Fun",
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(client, interaction) {
        const { user, guild } = interaction
        let choices = ["Pierre", "Papier", "Ciseaux"]
        const botchoice = `${choices[(Math.floor(Math.random() * choices.length))]}`

        const Embed = new EmbedBuilder()
            .setColor("DarkOrange")
            .setDescription(`<@${user.id}> choisissez ci-dessous !`)

        const row = new ActionRowBuilder().addComponents(

            new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId("pierre")
                .setLabel("Pierre")
                .setEmoji(`✊`),

            new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId("papier")
                .setLabel("Papier")
                .setEmoji(`✋`),

            new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId("ciseaux")
                .setLabel("Ciseaux")
                .setEmoji(`✌`),

        )

        const Page = await interaction.reply({

            embeds: [Embed],
            components: [row]
        })
        const col = Page.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: ms("10s")
        })
        col.on("collect", i => {

            if (i.user.id !== user.id) return 

            switch (i.customId) {

                case "pierre": {

                    if (botchoice == "Pierre") {
                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`DarkOrange`)
                                    .setDescription(`\`\`\`Match nul !\`\`\``)
                                    .addFields(
                                        { name: "Votre choix", value: "Pierre", inline: true },
                                        { name: "Mon choix", value: "Pierre", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }

                    if (botchoice == "Papier") {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`DarkOrange`)
                                    .setDescription(`\`\`\`J'ai gagné, vous avez perdu !\`\`\``)
                                    .addFields(
                                        { name: "Votre choix", value: "Pierre", inline: true },
                                        { name: "Mon choix", value: "Papier", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }
                    if (botchoice == "Ciseaux") {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`DarkOrange`)
                                    .setDescription(`\`\`\`Vous avez gagné !\`\`\``)
                                    .addFields(
                                        { name: "Votre choix", value: "Pierre", inline: true },
                                        { name: "Mon choix", value: "Ciseaux", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }
                }
                case "papier": {
                    if (botchoice == "Pierre") {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`DarkOrange`)
                                    .setDescription(`\`\`\`Vous avez gagné !\`\`\``)
                                    .addFields(
                                        { name: "Votre choix", value: "Papier", inline: true },
                                        { name: "Mon choix", value: "Pierre", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }

                    if (botchoice == "Papier") {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`DarkOrange`)
                                    .setDescription(`\`\`\`Match nul !\`\`\``)
                                    .addFields(
                                        { name: "Votre choix", value: "Papier", inline: true },
                                        { name: "Mon choix", value: "Papier", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }
                    if (botchoice == "Ciseaux") {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`DarkOrange`)
                                    .setDescription(`\`\`\`J'ai gagné, vous avez perdu !\`\`\``)
                                    .addFields(
                                        { name: "Votre choix", value: "Papier", inline: true },
                                        { name: "Mon choix", value: "Ciseaux", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }
                }

                case "ciseaux": {

                    if (botchoice == "Pierre") {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`DarkOrange`)
                                    .setDescription(`\`\`\`J'ai gagné, vous avez perdu !\`\`\``)
                                    .addFields(
                                        { name: "Votre choix", value: "Ciseaux", inline: true },
                                        { name: "Mon choix", value: "Pierre", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }

                    if (botchoice == "Papier") {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`DarkOrange`)
                                    .setDescription(`\`\`\`Vous avez gagné !\`\`\``)
                                    .addFields(
                                        { name: "Votre choix", value: "Ciseaux", inline: true },
                                        { name: "Mon choix", value: "Papier", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }
                    if (botchoice == "Ciseaux") {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`DarkOrange`)
                                    .setDescription(`\`\`\`Match nul !\`\`\``)
                                    .addFields(
                                        { name: "Mon choix", value: "Ciseaux", inline: true },
                                        { name: "Votre choix", value: "Ciseaux", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }
                }
            }
        })
        col.on("end", (collected) => {

            if (collected.size > 0) return

            interaction.editReply({
                embeds: [
                    Embed.setDescription(`Vous n'avez rien choisi ! Fin du jeu !`)
                ],
                components: []
            })
        })
    }
}