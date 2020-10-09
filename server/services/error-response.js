/******************************************************************************
 * Title: error-response.js
 * Author: Professor Krasso
 * Modified by: Jeff Shepherd
 * Date: 10/1/2020
 * Description: error-response class
 *****************************************************************************/

class ErrorResponse {
  constructor(data, httpCode = "500", message = "Internal server error") {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  // sets the values of members defaults and constructor args.
  // the defaults can be overridden
  toObject() {
    return {
      'httpcode': this.httpCode,
      'message': this.message,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString()
    }
  }
}

module.exports = ErrorResponse;
