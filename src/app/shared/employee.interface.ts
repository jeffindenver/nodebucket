/******************************************************************************
 * Title: employee.interface.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/8/2020
 * Description: employee interface
 *****************************************************************************/

 import {Item} from './item.interface';

 export interface Employee {
   id: string;
   todo: Item[];
   done: Item[];
 }
