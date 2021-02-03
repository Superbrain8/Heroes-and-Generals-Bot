module.exports = {
  apps : [{
    name: 'h-g-bot',
    script: 'index.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
  //  args: 'one two',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
    //  LD_PRELOAD: "/usr/local/lib/libjemalloc.so.2", Uncomment if jemalloc is used
    },
    max_restarts : '5'
  }],

};
