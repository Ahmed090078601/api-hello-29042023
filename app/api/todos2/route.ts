import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { boolean, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { InferModel, eq, sql } from 'drizzle-orm';
import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
    connectionString: "postgres://default:pYIHDxF38NGO@ep-bitter-frost-369107.us-east-1.postgres.vercel-storage.com:5432/verceldb",
  });

  const db: NodePgDatabase = drizzle(pool);
const db = drizzle(sql)

const tasks = pgTable('tasks',{

    ID: serial('ID').primaryKey(),
    TASKNAME: text ('TASKNAME'),
    CREATEDAT: timestamp('CREATEDAT').defaultNow().notNull(),
    ISDONE: boolean('false').notNull()
});

export type Task = InferModel<typeof tasks>;
export type NewTask = InferModel<typeof tasks, 'insert'>;

export async function Get(){
    console.log(db);
    const allTasks = await db.select().from(tasks);
    return NextResponse.json(allTasks)
}

export async function POST(request : NextResponse){
    const req = await request.json();
    const newTask: NewTask ={
    TASKNAME: req.TASKNAME,
    ISDONE: req.ISDONE,
    };
console.log(db);
const insertedUsers = await db.insert(tasks).values(newTask).returning();

return NextResponse.json(insertedUsers);
}