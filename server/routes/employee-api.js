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
 *  FindOne
 *****************************************************************************/
let findOne = function (req, res, next) {

  try {
    Employee.findOne({
      "id": req.params.id
    }, res.locals.selection, function (error, employee) {

      if (error) {
        console.log(error);
        res.locals.errorResponse = new ErrorResponse(error);
      } else {
        console.log(employee);
        res.locals.successResponse = new BaseResponse(employee);
        console.log("successResponse set");
        console.log(res.locals.successResponse.toObject());
      }
    });
    // catch any other errors
  } catch (e) {
    console.log(e);
    const catchErrorResponse = new ErrorResponse(e.message);
    res.status(500).send(catchErrorResponse.toObject());
  }

}

/******************************************************************************
 * Find employee by ID API
 *****************************************************************************/
router.get('/:id', async (req, res) => {

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
        const successResponse = new BaseResponse(employee);
        res.json(successResponse.toObject());
      }
    });
    // catch any other errors
  } catch (e) {
    console.log(e);
    const catchErrorResponse = new ErrorResponse(e.message);
    res.status(500).send(catchErrorResponse.toObject());
  }
})

/******************************************************************************
 * Find all tasks by ID API
 *****************************************************************************/
router.get('/:id/tasks', async (req, res) => {

  try {
    Employee.findOne({
      "id": req.params.id
    }, 'id todo done', function (error, employee) {

      if (error) {
        console.log(error);
        const errorResponse = new ErrorResponse(error);
        res.status(500).send(errorResponse.toObject());
      } else {
        console.log(employee);
        const successResponse = new BaseResponse(employee);
        res.json(successResponse.toObject());
      }
    });
    // catch any other errors
  } catch (e) {
    console.log(e);
    const catchErrorResponse = new ErrorResponse(e.message);
    res.status(500).send(catchErrorResponse.toObject());
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
 * Update task by ID API
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
    // catch any other errors
  } catch (e) {
    console.log(e);
    const catchErrorResponse = new ErrorResponse(e.message);
    res.status(500).send(catchErrorResponse.toObject());
  }
})

/******************************************************************************
 * Delete task by ID API
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
