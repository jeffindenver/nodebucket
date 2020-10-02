/******************************************************************************
 * Title: employee.js
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 9/18/2020
 * Description: employee model for the database
 *****************************************************************************/
"use strict";

const mongoose = require('mongoose');
const item = require('./item');
const Schema = mongoose.Schema;

let EmployeeSchema = new Schema({
  id: String,
  firstName: String,
  lastName: String,
  todo: [item],
  done: [item]
}, {collection: 'employees'});

let Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;
