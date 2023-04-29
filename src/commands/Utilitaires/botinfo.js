const {  EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const djsv = require('../../../package.json')
const botversion = require('../../version.json')
const { connection } = require("mongoose");
const os = require('os')

const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setURL(`https://discord.com/application-directory/938555032289280010`)
            .setLabel('Inviter WhiteHall')
            .setStyle(ButtonStyle.Link)
            .setEmoji("💻"),

        new ButtonBuilder()
            .setURL("https://discord.com/api/oauth2/authorize?client_id=1053325445170483200&permissions=8&scope=bot")
            .setLabel("Inviter Nova | Prevname")
            .setStyle(ButtonStyle.Link)
            .setEmoji("📚"),

        new ButtonBuilder()
            .setURL("https://discord.gg/novaworld")
            .setLabel("Serveur support")
            .setStyle(ButtonStyle.Link)
            .setEmoji("👮")
    )

module.exports = {
    name: "botinfo",
    description: "Affiche les informations du bot",
    usage: "/botinfo",
    example: "/botinfo",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    async execute(client, interaction) {
        let guildsCount = await client.guilds.fetch();
        let usersCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
        const getChannelTypeSize = type => client.channels.cache.filter(channel => type.includes(channel.type)).size;

        const Replied = await interaction.reply({ content: "Chargement...", fetchReply: true })

        const status = [
            "Déconnecter",
            "Connecter",
            "En cours de connexion",
            "En cours de déconnexion"
        ]

        const embed = new  EmbedBuilder()
            .addFields(
                { 
                    name: "➔ Informations",
                    value: `
                    > **\`•\` Développeur :** <@1031155007694831636> 
                    > **\`•\` Nom d'utilisateur :** ${client.user} \`${client.user.tag}\`
                    > **\`•\` Tag :** ${client.user.discriminator}
                    > **\`•\` ID :** ${client.user.id}
                    > **\`•\` Date de création :** <t:${parseInt(client.user.createdTimestamp / 1000)}:f> (<t:${parseInt(client.user.createdTimestamp / 1000)}:R>)
                    ` ,
                    inline: false
                },
                { 
                    name: "➔ Statistiques",
                    value: `
                    > **\`•\` Démarré :** <t:${parseInt(client.readyTimestamp / 1000)}:f> (<t:${parseInt(client.readyTimestamp / 1000)}:R>)
                    > **\`•\` Serveurs :** ${guildsCount.size}
                    > **\`•\` Utilisateurs :** ${usersCount}
                    > **\`•\` Salons :** ${client.channels.cache.size}
                    > **\`•\` Ping avec l'API de Discord :** ${client.ws.ping}ms
                    > **\`•\` Status de la base de données :** ${status[connection.readyState]} (MongoDB)
                    ` ,
                    inline: false
                },
                { 
                    name: "➔ Informations techniques",
                    value: `
                    > **\`•\` Hébergeur :** Hetzner
                    > **\`•\` Système d'exploitation :** ${os.type().replace("Windows_NT", "Windows").replace("Darwin", "macOS")}
                    > **\`•\` Processeur :** ${os.cpus()[0].model}
                    > **\`•\` Mémoire utilisé :** ${(process.memoryUsage().rss/1024/1024).toFixed(2)}MB/16 384MB (${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%)
                    > **\`•\` Node.JS :** ${process.version}
                    > **\`•\` Discord.JS** : v${djsv.dependencies['discord.js']}
                    `.replace("^", ""),
                    inline: false
                }
            )
            .setAuthor({ name: 'Informations du bot', iconURL: `${client.user.displayAvatarURL()}`})
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
            .setColor(client.color)
            .setFooter({
                text: "©️ 2022 Protect",
            })

        Replied.edit({ content: null, embeds: [embed], components: [button] })
    }
 }