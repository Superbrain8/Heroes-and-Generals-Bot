const fetch = require('node-fetch');
const Discord = require('discord.js-light');
exports.run = async (client, message, args, settings) => {
    const query = args.slice(0).join("%20");
  
  try{
      const data  = await fetch(`https://heroesandgenerals.gamepedia.com/api.php?action=opensearch&format=json&uselang=en&search=${query}`).then(response => response.json());
       const array =[]
       for(let i = 0; i < data[1].length;i++){
       const string = `[${data[1][i]}](${data[3][i]})\n`
       array.push(string)
    }

      const embed = new Discord.MessageEmbed()
      .setColor('#EFFF00')
      .setTitle(`WIKI Search for: ${data[0]}`)
      .setDescription(`Here are the Search Results:\n${array}`)
  
  message.channel.send(embed);
} catch (error){message.reply(`Something went wrong. Please try again`),console.error(`[WIKI] ${error}`);}  
};

module.exports.command = {
	name: "wiki",
	category: "Utility",
	usage: "wiki <searchterm>",
};
