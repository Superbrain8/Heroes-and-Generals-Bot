# Heroes and Generals Bot
 
This is a small Discord Bot using the API ive made for getting data from the Leaderboard, and it can Search the Game Wiki.
The Project is more or less DOA for me since the Support from Retro for 3rd party Devs is horrible.


How to use:
Put your Bot token, MongoDB URL and Redis URL in the example.env
rename example.env to .env
if wanted use the ecosystem.config.js for pm2 (limits max restarts and can load jemalloc)
if not use node . or pm2 start index.js --name "name of the instance"
