exports.run = (client, message, args) => {
	//TODO: Make this one fancier
	let botping = new Date() - message.createdAt;
	let apiping = client.ws.ping;

	return message.channel.send(`Bot ping: ${botping}ms\nApi ping: ${apiping}ms`);
};

module.exports.command = {
	name: "ping",
	category: "Utility",
	usage: "ping",
};
