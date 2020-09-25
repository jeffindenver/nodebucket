/******************************************************************************
 * Title: employee.js
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 9/18/2020
 * Description: employee model for the database
 *****************************************************************************/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let EmployeeSchema = new Schema({
  id: String,
  firstName: String,
  lastName: String,
  taskLists: [{
    toDo: [{description: String}],
    done: [{description: String}]
  }]
}, {collection: 'employees'});

let Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
