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


## Setting up Heroku Pipeline and flow

First clone your local master branch to dev and push to github, repeat for a new branch called staging (you can call them what ever you want)
```
   git checkout -b dev
   git push origin dev:dev
```
  and staging
  ```
     git checkout -b staging
     git push origin staging:staging
  ```  
In Heroku, "connect" you App (It will become "Prod") to your github account and repo.    From the "Deploy" tab.  
  ![screen shot 2016-02-09 at 4 27 17 pm](https://cloud.githubusercontent.com/assets/1180747/12933316/0f2c84c8-cf4d-11e5-8e8c-ad8f0ea9e7a0.png)

Create a new Pipeline from the Heroku dashboard   ![screen shot 2016-02-09 at 4 57 13 pm](https://cloud.githubusercontent.com/assets/1180747/12933551/5b0a99f6-cf4e-11e5-9d58-21a6f173e865.png)

Once the Pipeline is create you will need to connect it to github too just like you did for the app.
![screen shot 2016-02-09 at 5 02 34 pm](https://cloud.githubusercontent.com/assets/1180747/12933687/05db9178-cf4f-11e5-8916-ff2834e447a3.png)  Note the upper right shows the connection to github and the prod 'stage'  Shows the commit SHA.  Heroku calls the three columns "stages" which I find kind of confusing since one is called stage.    You will also notice that there is not a "stage" for dev.   It will come soon,  and there is a special stage called review apps.

Ok Now we are set to add our new branches into our pipe line but we actually have to Fork  the Heroku app two times.   We will add the stage name to the suffix of the app for a good convention.   The easiest way to do this is using the heroku for command.
```
heroku fork --from sailpipe --to sailpipe-dev
heroku fork --from sailpipe --to sailpipe-staging
```  

![screen shot 2016-02-09 at 5 25 50 pm](https://cloud.githubusercontent.com/assets/1180747/12934185/6030558e-cf52-11e5-9aa2-435fe1dfce8d.png)

![screen shot 2016-02-09 at 5 27 35 pm](https://cloud.githubusercontent.com/assets/1180747/12934200/73c8e8a4-cf52-11e5-9d41-1fc1dacce252.png)

We have added a staging app to the staging "stage" but we don't have it hooked up to the github branch yet.   In order to do that click on the three dots next to the staging app and select configure Automatic deploys.

![screen shot 2016-02-09 at 5 30 40 pm](https://cloud.githubusercontent.com/assets/1180747/12934262/e68c0056-cf52-11e5-9a24-ecbf68fa0db3.png)

and select the staging branch.  ![screen shot 2016-02-09 at 5 32 22 pm](https://cloud.githubusercontent.com/assets/1180747/12934305/33f7a1e2-cf53-11e5-8a2b-63496aa16284.png)


Before we add the dev stage we need to enable review apps.   Click on the enable review app button and you will see a prompt to create an app json file from one of the two apps we have in the pipeline so far (we haven't added dev yet).   We need to do this because heroku is going to create new app from github pull requests.     Since the other two apps we created used the heroku fork command they also copied over the environmental variable.   This json file will set the rules to copy over the env vars  to the newly created spot apps.   Be careful,   if you have any addons you are paying for they will be copied over too and you will get charged.. ![screen shot 2016-02-09 at 5 40 59 pm](https://cloud.githubusercontent.com/assets/1180747/12934520/bc372324-cf54-11e5-8f5d-f192e70d8ec3.png)  You will be taken to another page that will allow you to set those rules 9amoungst other things)
![screen shot 2016-02-09 at 5 46 42 pm](https://cloud.githubusercontent.com/assets/1180747/12934587/4e8e2e02-cf55-11e5-9558-029dc13da06c.png)

Ok we are now configured to create a Review App.   I am going to trick github and just push master to a new branch called kyle the do a pull request on that one.   
```
git push github master:kyle
```
I create a pull request in the gihub UI

![screen shot 2016-02-09 at 5 55 15 pm](https://cloud.githubusercontent.com/assets/1180747/12934723/52e1b798-cf56-11e5-9880-e189dbfcab52.png)

And Presto!   There it is in my pipeline.   

![screen shot 2016-02-09 at 5 56 53 pm](https://cloud.githubusercontent.com/assets/1180747/12934749/8fbf79d4-cf56-11e5-8cc7-05317999cc50.png)

I am going to click the button to create it.   But first I have to grab that app.json file created and attach it to my branch 'kyle' 
