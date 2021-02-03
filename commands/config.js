const { GUILDS } = require("../database/models");

exports.run = async (client, message, args, settings) => {
	if (
		!message.member.permissions.has("ADMINISTRATOR") &&
		message.author.id != client.config.owner
	)
		return message.reply("You have no Permissions to run the command");

	let setting = args[0];
	let updated = args.slice(1).join(" ");

	switch (setting) {
		case "prefix": {
			if (updated) {
				try {
					await GUILDS.updateOne(
						{ guildID: message.guild.id },
						{ prefix: updated }
					);
					return message.channel.send(
						`Prefix has been updated to: \`${updated}\``
					);
				} catch (error) {
					console.error(error);
					message.channel.send(`An error occurred: **${error.message}**`);
				}
			}

			message.channel.send(`Current prefix: \`${settings.prefix}\``);
			break;
		}
	
		default: {

			message.channel.send(
				`Current settings:\nprefix: ${settings.prefix}`
			);
			break;
		}
	}
};

module.exports.command = {
	name: "config",
	category: "Administrator",
	description: `Change Settings on the Bot.`,
	usage: "config (module) (setting)",
};
