const Discord = require("discord.js-light");
const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message) => {
	// get approximate CPU usage of the current proccess over a given amount of time in milliseconds
	async function cpuUsage(time) {
		// store current cpu timings
		let startTime = process.hrtime();
		let startCPU = process.cpuUsage();

		// wait for a defined time in ms
		await new Promise((r) => setTimeout(r, time));

		// get timings difference
		let elapsedTime = process.hrtime(startTime);
		let elapsedCPU = process.cpuUsage(startCPU);

		// calculate high resolution milliseconds from process.hrtime()
		let milliseconds = elapsedTime[0] * 1000 + elapsedTime[1] / 1000000;

		// calculate high resolution milliseconds of CPU activity
		let timings = elapsedCPU.user / 1000 + elapsedCPU.system / 1000;

		// calculate percentage from cpu time and total time
		let percentage = (100 * timings) / milliseconds;

		// return approcimate percentage of cpu used by this process
		return percentage.toFixed(2);
	}

	function mem() {
		let used = process.memoryUsage().rss;
		return Math.round((used / 1024 / 1024) * 100) / 100;
	}

	async function Uptime() {
		const duration = moment
			.duration(client.uptime)
			.format(" D [days], H [hrs], m [mins], s [secs]");
		return duration;
	}
	try {
		let embed = new Discord.MessageEmbed()
			.setTitle("Bot information")
			.setColor("RANDOM")
			.setThumbnail(client.user.avatarURL)
			.addField(`Name`, client.user.username)
			.addField(`Bot Creator`, "Superbrain8#4020")
			.addField(
				`Bot Created`,
				moment(client.user.createdAt).format("MMMM Do YYYY, h:mm:ss")
			)
			.addField(`Node Version`, process.version)
			.addField(
				`Discord.js Version`,
				Discord.version.split("(")[1].slice(0, -1)
			)
			.addField(`Uptime`, await Uptime())
			.addField(`Ram Usage`, `${mem()}MB`)
			.addField(`CPU Usage`, (await cpuUsage(2000)) + "%");
		return message.channel.send(embed);
	} catch (error) {
		message.reply(`ERROR. please try again`),
			console.error(`[Botinfo] ${error}`);
	}
};

module.exports.command = {
	name: "botinfo",
	category: "Other",
	description: `Get informations about the Bot`,
	usage: "botinfo",
};
