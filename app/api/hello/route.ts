import { NextRequest, NextResponse } from "next/server";

import postgres from "postgres";

export async function GET(request: NextRequest) {
  const conn = postgres({
    ssl: require,
  });
  const result = await conn.unsafe("SELECT * FROM playing_with_neon" );
  console.log("backend result", result);
  return new NextResponse(JSON.stringify(result));
}

export async function POST(request: Request) {
 const req = await request.json();
 if(req.name){
  return NextResponse.json({
    To: "Ahmed",
    Message: "All well here",
    RequestType: "POST"
  });
}
else{
  return new NextResponse('Please include your name in POST request');
}
}

export async function PUT(request: Request) {
  const req = await request.json();
  if(req.name){
   return NextResponse.json({
     To: "Ahmed",
     Message: "All well here",
     age: req.age,
     name:req.name,
     RequestType: "PUT"
   });
 }
 else{
   return new NextResponse('Please include your name in POST request');
 }
 }

 export async function DELETE() {

   return NextResponse.json({
     To: "Ahmed",
     Message: "All well here",
     RequestType: "DELETE"
   });
 }
 