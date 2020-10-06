import { Application } from "https://deno.land/x/oak/mod.ts";

import todosRoute from "./routes/todos.ts";
import { connect } from './helpers/db_client.ts'

connect();


const app = new Application();

app.use(async (ctx, next) => {
//   ctx.response.body = "Hello World!";
    console.log("MIDDLEWARE");
    await next();
});

app.use(async (ctx, next) => {
    ctx.response.headers.set('Access-Control-Allow-Origin','*');
    ctx.response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    await next();
})

app.use(todosRoute.routes());
app.use(todosRoute.allowedMethods());

await app.listen({ port: 4000 });