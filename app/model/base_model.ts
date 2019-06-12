import { Model } from 'sequelize';
import * as moment from 'moment';

export default class BaseModel<T = any, K = any> extends Model<T, K> {
    dataValues: any;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    toJSON() {
        const keys = Object.getOwnPropertyNames(this.dataValues);
        const json = {};
        keys.forEach(k => {
            json[k] = this[k];
            if (this[k] && (k === 'createdAt' || k === 'updatedAt')) {
                json[k] = moment(this[k]).format('YYYY-MM-DD HH:mm:ss');
            }
        });
        console.log(json);
        return json;
    }
}
