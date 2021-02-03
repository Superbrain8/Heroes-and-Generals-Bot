const { GUILDS } = require("../database/models");
module.exports = async (client, guild) => {
	try {
        await GUILDS.findOneAndRemove({guildID: guild}, function(err){console.error(err);});
	} catch (error) {
		console.error(error);
	}
};
