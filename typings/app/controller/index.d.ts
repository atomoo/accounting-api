// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCategories from '../../../app/controller/categories';
import ExportRecords from '../../../app/controller/records';

declare module 'egg' {
  interface IController {
    categories: ExportCategories;
    records: ExportRecords;
  }
}
