import { defineConfig } from "auth-astro";
import Google from "@auth/core/providers/google";
import Facebook from "@auth/core/providers/facebook";
import Twitter from "@auth/core/providers/twitter";

export default defineConfig({
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: import.meta.env.FACEBOOK_APP_ID,
      clientSecret: import.meta.env.FACEBOOK_APP_SECRET,
      scope: ["email", "public_profile", "instagram_basic", "pages_show_list"],
    }),
    Twitter({
      clientId: import.meta.env.TWITTER_CLIENT_ID,
      clientSecret: import.meta.env.TWITTER_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "facebook" && account.accessToken) {
        token.accessToken = account.accessToken;
        const response = await fetch(
          `https://graph.instagram.com/me?fields=id,username&access_token=${account.accessToken}`
        );
        const instagramData = await response.json();
        token.username = instagramData.username;
      }
      if (account?.provider === "twitter" && profile) {
        token.username = profile.data.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.username) {
        session.user.username = token.username;
      }
      return session;
    },
  },
});
