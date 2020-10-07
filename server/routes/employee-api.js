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
 * FindOne function awaits results from the Mongo model.findOne function.
 * The results are attached to the response object, which is magically
 * passed to the next function in the callback chain.
 *****************************************************************************/
let findOne = async (req, res) => {
  try {
    await Employee.findOne({
      'id': req.params.id
    }, res.locals.selection, function (error, employee) {

      if (error) {
        res.locals.result = {
          error: error
        };
        console.log(error);
      } else {
        console.log(employee);
        res.locals.result = {
          success: employee
        };
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(new ErrorResponse(e.message).toObject());
  }
}

/******************************************************************************
 * Refactored Find employee by ID API
 *****************************************************************************/
router.get('/:id', async (req, res, next) => {
    res.locals.selection = '';
    await findOne(req, res, next);
    next();
  },
  // TODO: extract the following anonymous function to "sendResult()" and share
  function (req, res) {

    if (res.locals.result.error) {
      const errorResponse = new ErrorResponse(res.locals.result.error);
      res.status(500).send(errorResponse.toObject());
    } else if (res.locals.result.success) {
      const successResponse = new BaseResponse(res.locals.result.success);
      res.json(successResponse.toObject());
    }
  })

/******************************************************************************
 * Refactored Find all tasks by ID API
 *****************************************************************************/
router.get('/:id/tasks', async (req, res, next) => {
    res.locals.selection = 'id todo done';
    await findOne(req, res, next);
    next();
  },
  function (req, res) {
    if (res.locals.result.error) {
      const errorResponse = new ErrorResponse(res.locals.result.error);
      res.status(500).send(errorResponse.toObject());
    } else if (res.locals.result.success) {
      const successResponse = new BaseResponse(res.locals.result.success);
      res.json(successResponse.toObject());
    }
  })

/******************************************************************************
 * Create task by ID API
 *****************************************************************************/
router.post('/:id/tasks', async (req, res) => {

  try {
    Employee.findOne({
      "id": req.params.id
    }, function (error, employee) {
      if (error) {
        console.log(error);
        const errorResponse = new ErrorResponse(error);
        res.status(500).send(errorResponse.toObject());
      } else {
        const item = {
          text: req.body.text
        };

        employee.todo.push(item);

        employee.save(function (err, updatedEmployee) {
          if (err) {
            console.log(err);
            const createTaskOnSaveMongoDbErrorResponse = new ErrorResponse(err);
            res.status(500).send(createTaskOnSaveMongoDbErrorResponse.toObject());
          } else {
            console.log(updatedEmployee);
            const createTaskOnSaveSuccessResponse = new BaseResponse(updatedEmployee);
            res.json(createTaskOnSaveSuccessResponse.toObject());
          }
        })
      }
    })
    // catch any other errors
  } catch (e) {
    console.log(e);
    const catchErrorResponse = new ErrorResponse(e.message);
    res.status(500).send(catchErrorResponse.toObject());
  }
})

/******************************************************************************
 * Update task by ID API. This function replaces the contents of the todo and
 * done arrays entirely. Any items that should be retained must included in
 * the request body.
 *****************************************************************************/
router.put('/:id/tasks', async (req, res) => {

  try {
    Employee.findOne({
      "id": req.params.id
    }, function (error, employee) {

      if (error) {
        console.log(error);
        const errorResponse = new ErrorResponse(error);
        res.status(500).send(errorResponse.toObject());
      } else {

        employee.set({
          todo: req.body.todo,
          done: req.body.done
        })

        employee.save(function (err, updatedEmployee) {
          if (err) {
            console.log(err);
            const updateTaskOnSaveMongoDbErrorResponse = new ErrorResponse(err);
            res.status(500).send(updateTaskOnSaveMongoDbErrorResponse.toObject());
          } else {
            console.log(updatedEmployee);
            const updateTaskOnSaveSuccessResponse = new BaseResponse(updatedEmployee);
            res.json(updateTaskOnSaveSuccessResponse.toObject());
          }
        })
      }
    });
    // catch errors
  } catch (e) {
    console.log(e);
    const catchErrorResponse = new ErrorResponse(e.message);
    res.status(500).send(catchErrorResponse.toObject());
  }
})

/******************************************************************************
 * Delete task by ID API. This function searches both the todo and done arrays
 * for the matching, unique id and then removes. Future versions may be able
 * to eliminate the need to check both arrays by checking the source element.
 *****************************************************************************/
router.delete('/:id/tasks/:taskId', async (req, res) => {

  try {
    Employee.findOne({
      "id": req.params.id
    }, function (error, employee) {

      if (error) {
        console.log(error);
        const errorResponse = new ErrorResponse(error);
        res.status(500).send(errorResponse.toObject());

      } else {
        console.log(employee);

        const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

        if (todoItem) {
          employee.todo.id(todoItem._id).remove();
          employee.save(function (err, updatedTodoItemEmployee) {
            if (err) {
              console.log(err);
              const deleteToDoItemOnSaveMongoDbErrorResponse = new ErrorResponse(err);
              res.status(500).send(deleteToDoItemOnSaveMongoDbErrorResponse.toObject());

            } else {
              console.log(updatedTodoItemEmployee);
              const deleteToDoItemSuccessResponse = new BaseResponse(updatedTodoItemEmployee);
              res.json(deleteToDoItemSuccessResponse.toObject());

            }
          })
        } else if (doneItem) {
          employee.done.id(doneItem._id).remove();

          employee.save(function (err, updatedDoneItemEmployee) {
            if (err) {
              console.log(err);
              const deleteDoneItemOnSaveMongoDbErrorResponse = new ErrorResponse(err);
              res.status(500).send(deleteDoneItemOnSaveMongoDbErrorResponse.toObject());
            } else {
              console.log(updatedDoneItemEmployee);
              const deleteDoneItemSuccessResponse = new BaseResponse(updatedDoneItemEmployee);
              res.json(deleteDoneItemSuccessResponse.toObject());

            }
          })
        } else {
          console.log('Invalid task id');
          const deleteTaskNotFoundResponse = new ErrorResponse(null, '200', "Unable to locate requested task");
          res.status(200).send(deleteTaskNotFoundResponse.toObject());
        }
      }
    });
    // catch any other errors
  } catch (e) {
    console.log(e);
    const catchErrorResponse = new ErrorResponse(e.message);
    res.status(500).send(catchErrorResponse.toObject());
  }
})

module.exports = router;
