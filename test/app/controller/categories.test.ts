import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/categories.test.ts', () => {
  it('should GET /api/categories and return a list of cagegories', async () => {
    const result = await app.httpRequest().get('/api/categories').expect(200);
    assert(Array.isArray(result));
    if (result.length > 0) {
      const keys = Object.keys(result[0]);
      assert(keys.includes('id')
        && keys.includes('type')
        && keys.includes('name')
        && keys.includes('title')
        && keys.includes('createdAt')
        && keys.includes('updatedAt'),
      );
    }
  });
  it('should POST /api/categories and fail', async () => {
    app.mockCsrf();
    const result = await app.httpRequest()
      .post('/api/categories')
      .send({})
      .expect(400);
    assert.deepEqual(result, {
      ret: 400,
      msg: '参数错误',
    });
  });
  it('should POST /api/categories and create a new category', async () => {
    app.mockCsrf();
    const result = await app.httpRequest()
      .post('/api/categories')
      .send({
        name: 'shopping-cart',
        type: 'feather',
        title: '购物',
      })
      .expect(201);
    assert(result.name === 'shopping-cart');
  });
});
