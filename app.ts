import { Application } from "https://deno.land/x/oak/mod.ts";

import todosRoute from "./routes/todos.ts";

const app = new Application();

// app.use((ctx) => {
//   ctx.response.body = "Hello World!";
// });

app.use(todosRoute.routes());
app.use(todosRoute.allowedMethods());

await app.listen({ port: 3000 });