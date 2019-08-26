const fs = require('fs')
const discord = require('discord.js')
const { prefix, token } = require('./config.js')

const client = new discord.Client()
client.commands = new discord.Collection()

fs.readdirSync('./commands').filter(file => file.endsWith('.js')).forEach(file => {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
})

function isAdmin(message) {
  let role = message.guild.roles.find(r => r.hasPermission('ADMINISTRATOR'))
  if (role.members.find(m => m.user === message.author)) {
    return true
  }
  return false
}

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return

    const args = msg.content.slice(prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase()

    const command = client.commands.get(commandName)
    if (command === undefined) {
      return msg.reply(`La commande n'existe pas ! \`${prefix}help\` pour afficher la liste des commandes`)
    }
    if (command.adminRole && msg.channel.type === 'dm') {
      return msg.reply(`La commande ne peut pas être exécutée ici`)
    }
    if (command.adminRole && !isAdmin(msg)) {
      return msg.reply(`Tu es trop faible pour exécuter cette commande !`)
    }
    if (args.length < command.requiredArgs) {
      return msg.reply(`La commande nécessite ${command.requiredArgs} arguments !\nusage: \`${prefix}${command.name} ${command.usage}\``)
    }
    try {
      command.execute(msg, args)
    } catch (e) {
      console.error(e)
      msg.reply(`Une erreur est survenue lors de l'exécution de la commande !`)
    }
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

if (!token) {
  throw new Error('access token is not set!')
}
client.login(token)
