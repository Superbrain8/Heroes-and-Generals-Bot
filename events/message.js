const { GUILDS } = require("../database/models");
const mongoose = require("mongoose");
const MongooseCache = require("mongoose-redis");
const cache = MongooseCache(mongoose, process.env.REDIS_URL);
module.exports = async (client, message) => {
	if (message.author.bot) return;
	if (message.channel.type == "dm") return;
	const uid = message.guild.id+client.user.id;
	const set = await GUILDS.findOne({ guildID: message.guild.id }).cache(120,uid);
	const settings = set ? set : { prefix: process.env.PREFIX};

	if (message.content.indexOf(settings.prefix) !== 0) return;
	const args = message.content
		.slice(settings.prefix.length)
		.trim()
		.split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command);
	if (!cmd) return;

	cmd.run(client, message, args, settings);
};
