Install Sails globally

    npm install -g sails

Create a new sails app and move to that directory
```    
sails new sailpipe
cd sailpipe
```

Start the sails app.   Soon we will switch this method to start sails by using formen ```fg start web```

    sails lift

If you don't have grunt installed you may need that too.
```
npm install -g grunt
npm install -g grunt-cli
```

Now lets create a model and microservice
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

add the following lines to ```config/env/production``` and config/env/development.js```.   Assuming you want to share the same mongolab connection.

```
models: {
  connection: 'myMongodbServer'
}

```

To recap what we have done in the last three steps:
1.  put the real variables in the .env file
2.  make connection.js read from the .env file to the myMongodbServer object
3.  for both dev and prod we make our models call the connection we just described

Push config to heroku by hand or with the heroku config plugin

    heroku config:push

deploy to Heroku

   git push


## Heroku Pipe line and flow
1.  in Heroku connect you App (It will become "Prod") to your github account and repo.   "Deploy"  [screenshot1]
