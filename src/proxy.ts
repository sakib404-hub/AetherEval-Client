import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const authRoutes = ["/login", "/register"];

const protectedRoute = [
  "/student-dashboard",
  "/mentor-dashboard",
  "/admin-dashboard",
];

const roleBasedRoute: Record<string, string> = {
  STUDENT : "/customer-dashboard",
  MENTOR : "/provider-dashboard",
  ADMIN: "/admin-dashboard",
};

export const proxy = async (request: NextRequest) => {

  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  
  const isAuthRoute = authRoutes.some((route)=>{
    return pathname.startsWith(route)
  })

  const isProtectedRoute = protectedRoute.some((route)=>{
    return pathname.startsWith(route)
  })

  if(!isProtectedRoute && !isAuthRoute){
    return NextResponse.next();
  }


  //? checking if the access Token is there
  if (!accessToken) {

    if(isProtectedRoute){

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  //? if there is the accesstoken then decode it
  const decodedAccessToken = jwt.decode(accessToken) as JwtPayload;

  //? finding the role from the decoded access token
  const role = decodedAccessToken?.role;

  //? not logged in --> login --> dashboard
  if(!accessToken && isProtectedRoute){
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  //? logged in but trying to go login  or register
  if(accessToken && isAuthRoute){
    const redirectUrl = role && roleBasedRoute[role] ? roleBasedRoute[role] : '/';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  if(accessToken && role && isProtectedRoute){
    const expectedDashboard = roleBasedRoute[role];

    if(expectedDashboard && !pathname.startsWith(expectedDashboard)){
        return NextResponse.redirect(new URL(expectedDashboard, request.url))
    }
    return NextResponse.next();
  }
};

export const config = {
  matcher: [
    "/login",
    "/register",
    "/customer-dashboard/:path*",
    "/provider-dashboard/:path*",
    "/admin-dashboard/:path*",
  ],
};