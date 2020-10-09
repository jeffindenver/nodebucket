/******************************************************************************
 * Title: base-response.js
 * Author: Professor Krasso
 * Modified by: Jeff Shepherd
 * Date: 10/1/2020
 * Description: base-response class which provides uniformity to repsonses
 *****************************************************************************/

class BaseResponse {
  constructor(data, httpCode = "200", message = "successful") {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  // sets the values of members defaults and constructor args.
  // the defaults can be overridden
  toObject() {
    return {
      'httpCode': this.status,
      'message': this.message,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString()
    }
  }
}

module.exports = BaseResponse;
