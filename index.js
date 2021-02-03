const { Client, Collection } = require("discord.js-light");
const fs = require('fs');
require("dotenv").config();

//Invite URL https://discord.com/oauth2/authorize?client_id=798522486236381204&scope=bot&permissions=3110

const client = new Client({
	cacheGuilds: true,
	cacheChannels: false,
	cacheOverwrites: true,
	cacheRoles: true,
	cacheEmojis: false,
	cachePresences: false,
});

client.commands = new Collection();
client.mongoose = require("./database/mongoose");


fs.readdir("./events/", (err, files) => {
	if (err) return console.error;
	files.forEach((file) => {
		if (!file.endsWith(".js")) return;
		const evt = require(`./events/${file}`);
		let evtName = file.split(".")[0];
		console.log(`Loaded event '${evtName}'`);
		client.on(evtName, evt.bind(null, client));
	});
});

fs.readdir("./commands/", async (err, files) => {
	if (err) return console.error;
	files.forEach((file) => {
		if (!file.endsWith(".js")) return;
		let props = require(`./commands/${file}`);
		let cmdName = file.split(".")[0];
		console.log(`Loaded command '${cmdName}'`);
		client.commands.set(cmdName, props);
	});
});

process.on("unhandledRejection", (error) => {
	console.error(`Uncaught Promise Error: \n${error.stack}`);
});

process.on("uncaughtException", (err) => {
	let errmsg = (err ? err.stack || err : "")
		.toString()
		.replace(new RegExp(`${__dirname}/`, "g"), "./");
	console.error(errmsg);
});

client.mongoose.init();
client.login(process.env.DISCORD_TOKEN);
