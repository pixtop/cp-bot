const { prefix } = require('../config.js')

const cmd =
`
- **!help**
- **!server**
`

module.exports = {
  name: `help`,
  description: `Affiche l'aide`,
  adminRole: false,
  requiredArgs: 0,
  usage: `[nom de la commande]`,
  execute(msg, args) {
    let content
    const { commands } = msg.client
    if (args.length) {
      const command = commands.get(args[0].toLowerCase())
      content = command
      ? `${command.description}\nusage: \`${prefix}${command.name} ${command.usage}\``
      : `Oups ! Cette commande n'existe pas`
    } else {
      content =
        '**A la rescousse !**\nVoici une *liste* de commandes disponible pour toi :'
        + cmd +
        `Pour plus d'information sur une commande utilise \`${prefix}help [nom de la commande]\``
    }
    msg.author.send(content)
  },
}
