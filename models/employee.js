/*
*===============================================================================
* Title:  employee.js
* Author: Jeff Shepherd
* Date:   9/22/2020
* Modified by:
* Description: employee model for the database
*===============================================================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let EmployeeSchema = new Schema({
  id: String,
  taskLists: [{
    toDo: [{description: String}],
    done: [{description: String}]
  }]
});

let Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
