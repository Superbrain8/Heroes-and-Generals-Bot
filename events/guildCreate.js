const { GUILDS } = require("../database/models");
const mongoose = require("mongoose")
module.exports = async (client, guild) => {
    //New Guild
	const newGuild = new GUILDS({
        _id:mongoose.Types.ObjectId(),
        guildID:guild.id,
        prefix:process.env.PREFIX,
    });

	try {
		await newGuild.save();
	} catch (error) {
		console.error(error);
	}
};
