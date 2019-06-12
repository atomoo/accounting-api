// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCategories from '../../../app/controller/categories';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    categories: ExportCategories;
    home: ExportHome;
  }
}
