import { NextResponse } from "next/server";

export function middleware(req) {


  const token = req.cookies.get("auth_token"); // Get token from cookies


  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login"; // Redirect to login
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Allow the request to proceed
}

export const config = {
  matcher: [
    "/",                      
    "/dashboard/:path*",      
    "/profile/:path*",        
    "/products/:path*",       
    "/product-detail/:path*", 
    "/orders/:path*",         
    "/order-detail/:path*",   
    "/installation/:path*",   
    "/Chat/:path*",   
    "/contact_us/:path*",          
  ],
};
