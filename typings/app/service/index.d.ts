// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCategories from '../../../app/service/categories';
import ExportRecords from '../../../app/service/records';

declare module 'egg' {
  interface IService {
    categories: ExportCategories;
    records: ExportRecords;
  }
}
