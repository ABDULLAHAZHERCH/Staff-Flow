// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { verify } from "jsonwebtoken";

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   // Define public paths that don't require authentication
//   const isPublicPath = path === "/" || path === "/auth/sign-in";

//   // Get the token from the cookies
//   const token = request.cookies.get("staffflow_token")?.value || "";

//   // If the path is public and the user is logged in, redirect to the appropriate dashboard
//   if (isPublicPath && token) {
//     try {
//       const decoded = verify(
//         token,
//         process.env.JWT_SECRET || "staffflow_secret_key"
//       );
//       if (typeof decoded === "object" && decoded.role) {
//         // Redirect based on user role
//         if (decoded.role === "manager") {
//           return NextResponse.redirect(
//             new URL("/dashboard/manager", request.url)
//           );
//         } else if (decoded.role === "employee") {
//           return NextResponse.redirect(
//             new URL("/dashboard/employee", request.url)
//           );
//         }
//       }
//     } catch (error) {
//       // If token verification fails, continue to the public path
//     }
//   }

//   // If the path is not public and the user is not logged in, redirect to sign-in
//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL("/auth/sign-in", request.url));
//   }

//   // If the path is for a specific role, check if the user has that role
//   if (
//     path.startsWith("/dashboard/manager") ||
//     path.startsWith("/dashboard/employee")
//   ) {
//     try {
//       const decoded = verify(
//         token,
//         process.env.JWT_SECRET || "staffflow_secret_key"
//       );
//       if (typeof decoded === "object" && decoded.role) {
//         // Check if the user is accessing the correct dashboard
//         if (
//           path.startsWith("/dashboard/manager") &&
//           decoded.role !== "manager"
//         ) {
//           return NextResponse.redirect(
//             new URL("/dashboard/employee", request.url)
//           );
//         }
//         if (
//           path.startsWith("/dashboard/employee") &&
//           decoded.role !== "employee"
//         ) {
//           return NextResponse.redirect(
//             new URL("/dashboard/manager", request.url)
//           );
//         }
//       }
//     } catch (error) {
//       // If token verification fails, redirect to sign-in
//       return NextResponse.redirect(new URL("/auth/sign-in", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/", "/auth/sign-in", "/dashboard/:path*"],
// };
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Debugging: Log the incoming request path
  // console.log("Incoming request path:", path);

  // Define public paths that don't require authentication
  const isPublic = path === "/" || path === "/auth/sign-in";

  // If the path is public and the user is logged in, redirect to the appropriate dashboard
  // Skipping token check for simplicity (cookie logic removed)

  if (isPublic) {
    // Debugging: Log that it's a public path
    // console.log("Public path accessed:", path);
    return NextResponse.next();
  }

  // Debugging: Log that the path is not public and we're proceeding with role validation
  // console.log("Private path accessed, need role check:", path);

  // Role-based redirects for manager or employee dashboards
  if (path.startsWith("/dashboard/manager")) {
    // Debugging: Log attempt to access the manager dashboard
    // console.log("Attempt to access the manager dashboard.");
    // You could add more logic to check role if needed
  } else if (path.startsWith("/dashboard/employee")) {
    // Debugging: Log attempt to access the employee dashboard
    // console.log("Attempt to access the employee dashboarsd.");
    // You could add more logic to check role if needed
  }

  // Default response if no condition matched (allow the request to proceed)
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/sign-in", "/dashboard/:path*"],
};
