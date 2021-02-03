const mongoose = require("mongoose");

module.exports = {
	init: () => {
		const dbOptions = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		//	poolSize: 5,
			connectTimeoutMS: 10000,
		//	family: 4,
		};
		mongoose.connect(process.env.MONGO_URL, dbOptions);
		mongoose.set("useFindAndModify", false);
		mongoose.set("useCreateIndex", true);
		mongoose.Promise = global.Promise;

		mongoose.connection.on("connected", () => {
			console.log("[NOTICE] Mongoose connection successfully opened!");
		});

		mongoose.connection.on("error", (err) => {
			console.error(`[ERROR] Mongoose connection error: \n ${err.stack}`);
		});

		mongoose.connection.on("disconnected", () => {
			console.log("[NOTICE] Mongoose connection disconnected");
		});
	},
};
