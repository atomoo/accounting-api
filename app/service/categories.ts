import { Service } from 'egg';
import { Category } from '../model/Category';

/**
 * Test Service
 */
export default class CategoryService extends Service {

    /**
     * query categories
     * @param params - query parameter
     */
    public async query(params: {id: number}|{name: string, type: string}): Promise<Category|null> {
        const category = await this.ctx.model.Category.findOne<Category>({
            where: {
                ...params,
            },
        });
        return category;
    }
}
