import { Router } from "https://deno.land/x/oak/mod.ts";
// import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";



import { getDb } from "../helpers/db_client.ts";


const router = new Router();

interface Todo { 
    id?: string;
    text: string;
}

let todos: Todo[] = [];

router.get('/todos', async (ctx) => {
    const todos = await getDb().collection('todos').find();
    const transformedTodos = todos.map(
        (todo : any) => {
        return { id: todo._id.$oid, text: todo.text };
    })
    ctx.response.body = { todos: transformedTodos };
});

router.post('/todos', async (ctx, next) => {
    const result = ctx.request.body();
    const data = await result.value;
    const newTodo: Todo = { 
        //id: new Date().toISOString(),
        text: data.text
};

    const id = await getDb().collection('todos').insertOne(newTodo);

    newTodo.id = id.$oid;

    ctx.response.body = { message: 'Created todo!', todo: newTodo  }
});

router.put('/todos/:todoId', async (ctx) => {
    const tid = ctx.params.todoId;
    const result = ctx.request.body();
    const data = await result.value;
    
    await getDb()
    .collection('todos')
    .updateOne({_id: {$oid:tid}}, {$set: { text: data.value.text } });
    
    // const todoIndex = todos.findIndex((todo) => {
    //     return todo.id === tid;
    // });
    // todos[todoIndex] = {
    //     id: todos[todoIndex].id, 
    //     text: data.text
    //  };
    ctx.response.body = { message: 'Updated Todo' }
});

router.delete('/todos/:todoId', async (ctx) => {
    const tid = ctx.params.todoId!;
    console.log('delete id',tid);
    let res = await getDb().collection('todos').deleteOne({ _id: {$oid:tid}});
    // todos = todos.filter((todo) => todo.id !== tid);
    ctx.response.body = { message: 'Todo Deleted' }
});


export default router;