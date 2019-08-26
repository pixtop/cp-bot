const { prefix } = require('../config.js')
const { exec } = require('child_process')

const actions = ['start', 'stop', 'restart']
const worlds = ['CP', 'HUB', 'MJ', 'NCP']

module.exports = {
  name: `server`,
  description: `Interface de commande pour administrer les serveurs Minecraft`,
  adminRole: true,
  requiredArgs: 2,
  usage: `start|stop|restart CP|HUB|MJ|NCP`,
  execute(msg, args) {
    if (!actions.includes(args[0]) || !worlds.includes(args[1].toUpperCase())) {
      return msg.author.reply(`usage: \`${prefix}${this.name} ${this.usage}\``)
    }
    const cmd = `mscs ${args[0]} ${args[1]}`
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(error)
        return msg.reply(`Une erreur interne est survenue lors de l'exécution de la commande !`)
      }
      if (stdout) {
        return msg.reply(`\n\`\`\`${stdout}\`\`\``)
      }
    })
  },
}
