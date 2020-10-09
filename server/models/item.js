/******************************************************************************
 * Title: item.js
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 9/29/2020
 * Description: task-list-item model for the database
 *****************************************************************************/
"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Item = new Schema({
  text: String
});

module.exports = Item;
