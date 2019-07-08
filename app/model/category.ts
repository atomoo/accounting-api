import { Application } from 'egg';
import BaseModel from './base_model';

export class Category extends BaseModel {
    id?: number;
    type: string;
    name: string;
    title: string;
    deleted: boolean;
}

export default (app: Application) => {
    const { INTEGER, STRING, BOOLEAN } = app.Sequelize;
    Category.init(
        {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            type: STRING(25),
            name: STRING(50),
            title: STRING(10),
            deleted: { type: BOOLEAN, defaultValue: false },
        },
        {
            sequelize: app.model,
        },
    );

    return Category;
};
