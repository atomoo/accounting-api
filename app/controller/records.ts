
import { Controller, Context } from 'egg';
import RecordService from '../service/records';
import { Record } from '../model/record';

export default class RecordController extends Controller {
    private recordService: RecordService;
    constructor(ctx: Context) {
        super(ctx);
        this.recordService = ctx.service.records;
    }

    public async index() {
        const { ctx } = this;
        const { categoryId, startTime, endTime } = ctx.query;
        const result = await this.recordService.query(categoryId, startTime, endTime);
        ctx.body = result;
    }

    public async create() {
        const { ctx } = this;
        const record: Record = ctx.request.body;
        if (!record.amount || !record.categoryId) {
            ctx.body = {
                ret: '400',
                msg: 'Invalid Parameter',
            };
            ctx.status = 400;
            return;
        }
        const result = await ctx.model.Record.create({
            categoryId: record.categoryId,
            amount: record.amount,
            createdAt: record.createdAt,
            desc: record.desc,
        });
        ctx.body = result;
    }

}
