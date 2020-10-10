import { MongoClient, Database } from "https://deno.land/x/mongo@v0.12.1/mod.ts";

let db: Database;

export function connect(){

    const client = new MongoClient();
    client.connectWithUri("mongodb://test:test@localhost/test?authSource=admin");
    console.log('Database connected');
    db = client.database("todo-app");  
}

export function getDb(){
    return db;
}

