import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const result = await ctx.model.Category.findAll();
    ctx.body = result;
  }
}
