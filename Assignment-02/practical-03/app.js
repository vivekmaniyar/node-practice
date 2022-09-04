const express = require('express');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configure redis client
const redisClient = redis.createClient({
    url: 'redis://default:3THQKOS4SPN9Fbpv0GoZ2JX1A4mW1xFt@redis-19519.c301.ap-south-1-1.ec2.cloud.redislabs.com:19519',
    legacyMode: true
})

redisClient.connect();

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});


app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}));

//Configure session middleware
// app.use(session({
//     store: new RedisStore({ client: redisClient }),
//     secret: 'secret$%^134',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: false, // if true only transmit cookie over https
//         httpOnly: false, // if true prevent client side JS from reading the cookie 
//         maxAge: 1000 * 60 * 10 // session max age in miliseconds
//     }
// }))

app.get("/", (req, res) => {
    const sess = req.session;
    if (sess.username && sess.password) {
        if (sess.username) {

            res.write(`<h1>Welcome ${sess.username} </h1><br>`)
            res.write(
                `<h3>This is the Home page</h3>`
            );
            res.end('<a href=' + '/logout' + '>Click here to log out</a >')
        }
    } else {
        res.sendFile(__dirname + "/login.html")
    }
});

app.post("/login", (req, res) => {
    const sess = req.session;
    const { username, password } = req.body
    sess.username = username
    sess.password = password
    // add username and password validation logic here if you want.If user is authenticated send the response as success
    res.end("success")
});

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return console.log(err);
        }
        res.redirect("/")
    });
});

app.listen(3000, () => {
    console.log("Server started at port 3000")
});