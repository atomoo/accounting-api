
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

    public async destroy() {
        const { ctx } = this;
        const id = ctx.query.id;
        if (!id) {
            ctx.status = 400;
            ctx.body = {
                ret: '400',
                msg: 'Invalid Parameter',
            };
            return;
        }
        const recordFound = await this.ctx.model.Record.findOne<Record>({ where: { id } });
        if (!recordFound) {
            ctx.status = 404;
            ctx.body = {
                ret: '404',
                msg: 'Not found',
            };
            return;
        }
        const updateResult = await ctx.model.Record.update(
            { deleted: true },
            {
                where: { id: recordFound.id! },
            },
        );
        if (updateResult && updateResult[0] === 1) {
            ctx.status = 200;
            ctx.body = {
                ret: '200',
                msg: 'success',
            };
            return;
        } else {
            ctx.status = 500;
            ctx.body = {
                ret: '500',
                msg: 'system error',
            };
            return;
        }
    }

}
