import { Context } from 'egg';

export default () => {
    return async function notFoundHandler(ctx: Context, next: () => void) {
        await next();
        if (ctx.status === 404 && !ctx.body) {
            if (ctx.acceptJSON) {
                ctx.body = { msg: 'Not Found' };
            } else {
                ctx.body = '<h1>Page Not Found</h1>';
            }
        }
    };
};
