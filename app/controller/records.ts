
import { Controller } from 'egg';

export default class RecordController extends Controller {
  public async index() {
    const { ctx } = this;
    // const { categoryId, startTime, endTime } = ctx.query;
    const result = await ctx.model.Record.findAll();
    ctx.body = result;
  }
}
