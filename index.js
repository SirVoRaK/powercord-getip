const { Plugin } = require('powercord/entities');

module.exports = class GetIP extends Plugin {
  startPlugin() {
    console.log("Get IP plugin loaded!")
    powercord.api.commands.registerCommand({
        command: 'ip',
        aliases: [],
        description: 'Returns your public IP.',
        usage: '{c} [--send]',
        executor: async (args) => ({send: args.includes('--send'), result: `${args.includes('--send') ? "IP: " : "Public IP: "}` + await this.ip()})
    })
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand('ip')
  }

  async ip() {
    try{
      const response = await fetch("https://ifconfig.me/ip")
      return await response.text()
    }catch(e){
      return "Try again"
    }
  }
}
