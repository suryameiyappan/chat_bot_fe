// const session = require('express-session'),
//   RedisStore = require('connect-redis')(session),
//   redis = require('redis');
/*
|--------------------------------------------------------------------------
| HELPER METHOD
|--------------------------------------------------------------------------
*/
// exports.getSessionConfig = () => {
  // return session({
  //   name: "SLIC-CHATBOT-CMS",
  //   store: new RedisStore({ 
  //       client: redis.createClient({
  //         host: process.env.REDIS_HOST,
  //         port: process.env.REDIS_PORT,
  //         db: process.env.REDIS_DB,
  //         ttl: 3 * 60 * 1000
  //       })
  //   }),
  //   cookie: {
  //     maxAge: 3 * 60 * 1000,
  //     domain: process.env.SESSION_DOMAIN,
  //     httpOnly: true
  //   },
  //   secret: process.env.SECRET_KEY,
  //   resave: true,
  //   saveUninitialized: true
  // });
// }