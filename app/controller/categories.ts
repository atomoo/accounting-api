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
        const result = await ctx.model.Category.findAll({ where: { deleted: false } });
        ctx.body = result;
    }

    public async create() {
        const { ctx } = this;
        const category: Category = ctx.request.body;
        if (!category.name || !category.type || !category.title) {
            ctx.body = {
                ret: '400',
                msg: 'Invalid Parameter',
            };
            ctx.status = 400;
            return;
        }
        const categoryRecord = await this.categoryService.queryOne({
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
        const categoryFound = await this.categoryService.queryOne({ id });
        if (!categoryFound) {
            ctx.status = 404;
            ctx.body = {
                ret: '404',
                msg: 'Not found',
            };
            return;
        }
        const updateResult = await ctx.model.Category.update(
            { deleted: true },
            {
                where: { id: categoryFound.id! },
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
