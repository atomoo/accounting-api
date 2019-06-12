import { Application } from 'egg';
import BaseModel from './base_model';

export class Category extends BaseModel {
    id?: number;
    type: string;
    name: string;
    title: string;
}

export default (app: Application) => {
    const { INTEGER, STRING } = app.Sequelize;
    Category.init(
        {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            type: STRING(25),
            name: STRING(50),
            title: STRING(10),
        },
        {
            sequelize: app.model,
        },
    );

    return Category;
};
