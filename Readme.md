# SMU PayPal Demo NodeJS

## Set Up

This codebase has been set up to work with heroku.

### Koding.com

Create a file `.envvars` with the following content.

    !#/bin/bash
    export ENV=debug
    export PAYPAL_MODE=sandbox
    export PAYPAL_CLIENT_ID=EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM
    export PAYPAL_CLIENT_SECRET=EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM
    export FIREBASE_TOKEN=sDsdf324fRMtKc6zojplvjaOW5MnyuhQzKTrq8wj
    export FIREBASE_URL=https://your-project.firebaseio.com
    export APP_BASE_URL=http://ulkkbc1e933e.laurenceputra.koding.io:3000
    export APP_PAYPAL_SUCCESS_CALLBACK=/payment/execute/
    export APP_PAYPAL_CANCEL_CALLBACK=/payment/cancel/

Replace `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` with the tokens you get 
from [PayPal Developer](https://developer.paypal.com/)'s Dashboard after you 
have created an application. Use `sandbox` for `PAYPAL_MODE` until your 
application is ready to go live.

For the Firebase envars, get the `FIREBASE_TOKEN` from the `Secrets` section 
when viewing the dashboard for your Firebase Application. And of course, 
replace the `FIREBASE_URL` with your firebase URL.

The `APP_*` envars are for you to define the endpoints PayPal should redirect 
your users to when the payment process is completed or cancelled. Change the 
`APP_BASE_URL` to your base URL without the trailing slash.

Once you have created the `.envvars` file, run 

    source .envvars

before you start the server. You can simply start the server by typing 
`npm start`. Do note that if this is your first time running the server, you 
will have to do an `npm install` to install all the dependencies.

### Heroku

Heroku's setup is slightly simpler. Once you have created the applicaiton, go 
to the settings tab of your applicaiton's dashboard, and click on `Reveal 
Config Vars`. Click on edit, and fill in the config vars similar to what you 
have done for `Koding.com` above, and replace the values with your values.

| KEY                         | VALUE                                            |
|-----------------------------|--------------------------------------------------|
| ENV                         | debug                                            |
| PAYPAL_MODE                 | sandbox                                          |
| PAYPAL_CLIENT_ID            | EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM     |
| PAYPAL_CLIENT_SECRET        | EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM     |
| FIREBASE_TOKEN              | sDsdf324fRMtKc6zojplvjaOW5MnyuhQzKTrq8wj         |
| FIREBASE_URL                | https://smu-paypal-demo.firebaseio.com/          |
| APP_BASE_URL                | http://is429-paypal-demo.herokuapp.com           |
| APP_PAYPAL_SUCCESS_CALLBACK | /payment/execute                                 |
| APP_PAYPAL_CANCEL_CALLBACK  | /payment/cancel/                                 |

Once you have entered the details, click on the save button. and simply connect 
your Heroku account to Github and you can deploy your code from Heroku without much 
hassle.

##Code

For simplicity reasons, most of the code is placed in the `index.js` file. Do 
note that you should organise your code properly for maintainability purposes 
when you are writing an application for your startup. A recommended framework 
to use for projects that need proper code organisation would be KrakenJS, 
which is built on top of many other powerful open source projects.

If you are interested in understanding the implementation of the PayPal 
billing agreement/subscription endpoints, feel free to go through the code.
The code has been documented to explain the process and rationale behind it. 
If you still have any questions about the code, open an issue 
[here](https://github.com/laurenceputra/smu-paypal-2015/issues).

## Payment Endpoints

There are 3 main endpoints for this server. 

The `/payment/create-plan` endpoint creates the plans based on what you have 
indicated in the `model.js` file. You will only need to run this once.

The `/payment/initiate/:planId` endpoint connects with PayPal to start the 
checkout process, and redirects the user to PayPal.

The `/payment/execute/` is redirected from PayPal. This is the point where 
you should store in Firebase that your user has paid for a certain plan.