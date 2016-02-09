npm install -g sails
sails new sailpipe
npm install -g grunt
npm install -g grunt-cli
cd sailpipe
sails lift


sails generate api user


##Heroku Specific Instructions
*//create the heroku app*
    heroku create sailpipe
*Create a 'Procfile' so Heroku knows what to do, add the following line to it*

    web: npm start

>If you want to simulate what Heroku will do start the app with `nf start web` and it should start on port 5000

*Next we need to create a ```.env``` and put our real mongo string in*
replace the real value after the =

```
//contents of .env
MY_MONGO_HOST=therealvalue
MY_MONGO_PORT=therealvalue
MY_MONGO_USER=therealvalue
MY_MONGO_PASSWD=therealvalue
MY_MONGO_db=therealvalue
```

and add the following section to config/connections.js this will be picked up from the .env file if you start the app with formen ```nf start web```

```
myMongodbServer: {
  adapter: 'sails-mongo',
  host: process.env.MY_MONGO_HOST,
  port: process.env.MY_MONGO_PORT,
  user: process.env.MY_MONGO_USER,
  password: process.env.MY_MONGO_PASSWD,
  database: process.env.MY_MONGO_db
},
```
