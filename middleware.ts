import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { PROTECTED_ROUTES } from "./routes";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(PROTECTED_ROUTES);
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
