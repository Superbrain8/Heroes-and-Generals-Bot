exports.run = async (client, message, args) => {
	message.channel.send(`ive sent you a DM with the link`);
	message.author
		.send(
			`Here is the Invite URL:  https://discord.com/oauth2/authorize?client_id=805387933041164348&scope=bot&permissions=19456`
		)
		.catch(() => message.reply("Can't send DM to you!"));
};
module.exports.command = {
	name: "invite",
	category: "Other",
	description: `Get the Inviteurl for the bot`,
	usage: "invite",
};
