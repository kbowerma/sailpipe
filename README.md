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

This will start you api on port 1337.   You can navigate to locahost:1337 and see some info.  Once you generate the user microservice you can easily add a record http://localhost:1337/user/create?Firstname=Less&Lastname=Nesman&email=Less@wkrp.org  or update with,  http://localhost:1337/user/update/56ba6a3cf9432d1100ca187a?Phone=555-1212 .   Cool Eh


##Heroku Specific Instructions for typical deployment
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

```javascript
myMongodbServer: {
  adapter: 'sails-mongo',
  host: process.env.MY_MONGO_HOST,
  port: process.env.MY_MONGO_PORT,
  user: process.env.MY_MONGO_USER,
  password: process.env.MY_MONGO_PASSWD,
  database: process.env.MY_MONGO_db
},
```

add the following lines to ```config/env/production``` and ```config/env/development.js```.   Assuming you want to share the same mongolab connection.

```javascript
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
1.  in Heroku connect you App (It will become "Prod") to your github account and repo.   "Deploy"  
![screen shot 2016-02-09 at 4 27 17 pm](https://cloud.githubusercontent.com/assets/1180747/12933316/0f2c84c8-cf4d-11e5-8e8c-ad8f0ea9e7a0.png)
2. Clone your local master branch to dev and push to github
```
   git checkout -b dev
   git push origin dev:dev
```
  and staging
  ```
     git checkout -b staging
     git push origin staging:staging
  ```  

4. Create a new Pipeline from the Heroku dashboard   ![screen shot 2016-02-09 at 4 57 13 pm](https://cloud.githubusercontent.com/assets/1180747/12933551/5b0a99f6-cf4e-11e5-9d58-21a6f173e865.png)
5.  Once the Pipeline is create you will need to connect it to github too just like you did for the app.
![screen shot 2016-02-09 at 5 02 34 pm](https://cloud.githubusercontent.com/assets/1180747/12933687/05db9178-cf4f-11e5-8916-ff2834e447a3.png)  Note the upper right shows the connection to github and the prod 'stage'  Shows the commit SHA
