import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.resources('categories', '/api/categories', controller.categories);
  router.resources('records', '/api/records', controller.records);
};
