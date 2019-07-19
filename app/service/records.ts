import { Service } from 'egg';
import { WhereOptions, Op } from 'sequelize';
import moment = require('moment');

export default class RecordService extends Service {
    public async query(categoryId?: number, startTime?: string, endTime?: string) {
        const queryParams: WhereOptions = {};
        if (categoryId) {
            queryParams.categoryId = categoryId;
        }
        if (startTime && endTime) {
            queryParams.createdAt = {
                [Op.gte]: moment(startTime).toDate(),
                [Op.lt]: moment(endTime).add(1, 'd').toDate(),
            };
        }
        const list = await this.ctx.model.Record.findAll({
            where: queryParams,
        });
        return list;
    }
}
