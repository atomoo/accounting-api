import { Controller, Context } from 'egg';
import { Category } from '../model/Category';
import CategoryService from '../service/categories';

export default class CategoryController extends Controller {

    private categoryService: CategoryService;

    constructor(ctx: Context) {
        super(ctx);
        this.categoryService = ctx.service.categories;
    }

    public async index() {
        const { ctx } = this;
        const result = await ctx.model.Category.findAll();
        ctx.body = result;
    }

    public async create() {
        const { ctx } = this;
        const category: Category = ctx.request.body;
        if (!category.name || !category.type || !category.title) {
            ctx.body = {
                ret: '400',
                msg: '参数错误',
            };
            ctx.status = 400;
            return;
        }
        const categoryRecord = await this.categoryService.query({
            name: category.name,
            type: category.name,
        });
        if (categoryRecord) {
            ctx.status = 409;
            ctx.body = {
                ret: '409',
                msg: 'Duplicate',
            };
            return;
        }
        const result = await ctx.model.Category.create({
            type: category.type,
            name: category.name,
            title: category.title,
        });
        ctx.body = result;
    }
}
