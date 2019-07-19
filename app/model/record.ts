import { Application } from 'egg';
import BaseModel from './base_model';

export class Record extends BaseModel {
    id?: number;
    amount: number;
    categoryId: number;
    desc: string;
    deleted: boolean;
}

export default (app: Application) => {
    const { INTEGER, STRING, BOOLEAN } = app.Sequelize;
    Record.init(
        {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            amount: INTEGER,
            categoryId: { type: INTEGER, field: 'category_id' },
            desc: STRING,
            deleted: BOOLEAN,
        },
        {
            sequelize: app.model,
        },
    );
    return Record;
};
