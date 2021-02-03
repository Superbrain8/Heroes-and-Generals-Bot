const fetch = require('node-fetch');
const Discord = require('discord.js-light');
exports.run = async (client, message, args, settings) => {
    if(args[0] !== "score" && args[0] !== "headshots" && args[0] !== "kills") return message.reply(`Please use score | headshots | kills for fetching a scoreboard.`);
  
  try{
      const data  = await fetch(`https://api.s8s.app/hg/leaderboard/${args}`).then(response => response.json());
       const array =[]
       for(let i = 0; i < data.length;i++){
        const score = i+1
       const string = `${score}. ${data[i].soldier} | ${data[i].player} | ${data[i].value}\n`
       array.push(string)
    }

      const embed = new Discord.MessageEmbed()
      .setColor('#EFFF00')
      .setTitle(`Scoreboard: ${args[0]}`)
      .setDescription(`#   Soldier    Player    Score\n${array}`)
  
  message.channel.send(embed);
} catch (error){message.reply(`Something went wrong. Please try again`),console.error(`[SCOREBOARD] ${error}`);}  
};

module.exports.command = {
	name: "leaderboard",
	category: "Utility",
	usage: "leaderboard <score|headshots|kills>",
};
