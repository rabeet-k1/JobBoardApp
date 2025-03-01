export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnFav = nextUrl.pathname.startsWith("/favorites");
      console.log(isOnFav, "isOnFavisOnFavisOnFav");
      if (isOnFav) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/favorites", nextUrl));
      }
      return true;
    },
  },
  providers: [],
};
