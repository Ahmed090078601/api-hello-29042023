import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { boolean, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { InferModel, eq} from 'drizzle-orm';
import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';


  const db = drizzle(sql)

const tasks = pgTable('tasks',{

    id: serial('id').primaryKey(),
    taskname: text ('taskname'),
    createdat: timestamp('createdat').defaultNow().notNull(),
    isdone: boolean('isdone').notNull()
});

export type Task = InferModel<typeof tasks>;
export type NewTask = InferModel<typeof tasks, 'insert'>;

export async function GET(){
    console.log(db);
    const allTasks = await db.select().from(tasks);
    return NextResponse.json(allTasks)
}

export async function POST(request : NextRequest){
    const req = await request.json();
    const newTask: NewTask ={
    taskname: req.taskName,
    isdone: req.IsDone,
    };
console.log(db);
const insertedUsers = await db.insert(tasks).values(newTask).returning();

return NextResponse.json(insertedUsers);
}

export async function PUT(request : NextRequest){
    const req = await request.json();
    if(req.id){
        const updateResult = await db.update(tasks)
        .set({isdone: req.isDone})
        .where(eq(tasks.id, req.id))
        .returning({taskname:tasks.taskname,
        iddone:tasks.isdone
        })
        return NextResponse.json(updateResult);

    }
}