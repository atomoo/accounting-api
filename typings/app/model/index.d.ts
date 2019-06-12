// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaseModel from '../../../app/model/base_model';
import ExportCategory from '../../../app/model/category';

declare module 'egg' {
  interface IModel {
    BaseModel: ReturnType<typeof ExportBaseModel>;
    Category: ReturnType<typeof ExportCategory>;
  }
}
