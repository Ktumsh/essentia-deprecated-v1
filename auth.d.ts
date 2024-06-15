import "auth-astro";

declare module "auth-astro" {
  interface Session {
    user: {
      name?: string;
      email?: string;
      image?: string;
      username?: string;
    };
  }
}
