import {NextResponse} from "next/server";
export function GET(request:Request){return NextResponse.redirect(new URL("/id",request.url),307)}
