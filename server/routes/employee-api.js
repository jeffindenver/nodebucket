/******************************************************************************
 * Title: employee-api.js
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 9/29/2020
 * Description: employee api
 *****************************************************************************/

"use strict";

/******************************************************************************
 * Require statements
 *****************************************************************************/
const Employee = require('../models/employee');
const express = require('express');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

let router = express.Router();

/******************************************************************************
 * Find One
 *****************************************************************************/
let findOne = async (req, selection) => {

  let employee;

  try {
    const id = req.params.id;
    employee = await Employee.findOne({'id': id}, selection).exec();
    console.log(employee);
  } catch (e) {
    console.log(e);
    return {error: e};
  }
  return {success: employee};
};

/******************************************************************************
 * Send Result
 *****************************************************************************/
let sendResult = async (result, res) => {
  if (result.error) {
    const errorResponse = new ErrorResponse(result.error);
    res.status(500).send(errorResponse.toObject());
  } else if (result.success) {
    const successResponse = new BaseResponse(result.success);
    res.json(successResponse.toObject());
  }
};

/******************************************************************************
 * Save doc
 *****************************************************************************/
let saveDoc = async (result, res) => {
  let employee = result.success;
  try {
    result.success = await employee.save();
    await sendResult(result, res);
  } catch (e) {
    await sendResult(e, res);
  }
};

/******************************************************************************
 * Find employee by ID API
 *****************************************************************************/
router.get('/:id', async (req, res) => {
  const selection = '';
  let result = await findOne(req, selection);
  await sendResult(result, res);
})

/******************************************************************************
 * Find all tasks by ID API
 *****************************************************************************/
router.get('/:id/tasks', async (req, res) => {
  const selection = 'id todo done';
  let result = await findOne(req, selection);
  await sendResult(result, res);
})

/******************************************************************************
 * Create task by ID API
 *****************************************************************************/
router.post('/:id/tasks', async (req, res) => {
  const selection = '';

  let result = await findOne(req, selection);
  const item = {text: req.body.text};

  let employee = result.success;
  employee.todo.push(item);

  await saveDoc(result, res);
})

/******************************************************************************
 * Update task by ID API. This function replaces the contents of the todo and
 * done arrays entirely. Any items that should be retained must included in
 * the request body.
 *****************************************************************************/
router.put('/:id/tasks', async (req, res) => {
  const selection = '';

  let result = await findOne(req, selection);
  let employee = result.success;

  employee.set({
    todo: req.body.todo,
    done: req.body.done
  })

  await saveDoc(result, res);
})

/******************************************************************************
 * Delete task by ID API. This function searches both the todo and done arrays
 * for the matching, unique id and then removes. Future versions may be able
 * to eliminate the need to check both arrays by checking the source element.
 *****************************************************************************/
router.delete('/:id/tasks/:taskId', async (req, res) => {
  const selection = '';

  let result = await findOne(req, selection);
  let employee = result.success;

  const todoItem = employee.todo.find(item =>
    item._id.toString() === req.params.taskId);

  const doneItem = employee.done.find(item =>
    item._id.toString() === req.params.taskId);

  if (todoItem) {
    employee.todo.id(todoItem._id).remove();
    await saveDoc(result, res);

  } else if (doneItem) {
    employee.done.id(doneItem._id).remove();
    await saveDoc(result, res);

  } else {
    console.log('Invalid task id');
    const errorResponse = new ErrorResponse(null, '200',
      "Unable to locate requested task");
    res.status(200).send(errorResponse.toObject());
  }
})

module.exports = router;
