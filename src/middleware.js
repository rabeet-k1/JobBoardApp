import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("check if calling this route");
  return NextResponse.next();
}

export const config = {
  matcher: ["/favorites"],
};
