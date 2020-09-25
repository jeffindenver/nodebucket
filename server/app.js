/******************************************************************************
 * Title: main.ts
 * Author: Professor Krasso
 * Modified by: Jeff Shepherd
 * Date: 9/18/2020
 * Description: server app
 *****************************************************************************/

"use strict";

/******************************************************************************
 * Require statements
 *****************************************************************************/
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Employee = require('./models/employee');

/******************************************************************************
 * App configurations
 *****************************************************************************/
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/******************************************************************************
 * Variables
 *****************************************************************************/
const port = 3000; // server port

const conn = 'mongodb+srv://nodebucket_user:dGSE855gCytKQGsD@buwebdev-cluster-1.' +
  'solm5.mongodb.net/nodebucket?retryWrites=true&w=majority';

/******************************************************************************
 * Database connection
 *****************************************************************************/
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
});

/******************************************************************************
 * APIs
 *****************************************************************************/

app.get('/api/employee/:id', async(req, res) => {
  try {
    let id = req.params.id;
    Employee.findOne({
      "id": id
    }, function (err, employee) {

      // catch database errors
      if(err) {
        console.log(err);
        res.status(500).send({
          'message': 'Internal server error'
        })

      // respond with employee object
      }
      else {
        console.log(employee);
        res.json(employee);
      }
    })

    // catch any other errors
  } catch(e) {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error'
    })
  }
})


/******************************************************************************
 * Create and start server
 *****************************************************************************/
http.createServer(app).listen(port, function () {
  console.log(`Application started and listening on port: ${port}`)
});
