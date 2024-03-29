/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import EmailProvider from 'next-auth/providers/email';
import AppleProvider from 'next-auth/providers/apple';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

const getProviders = () => {
    const providers = [];

    if (process.env.EMAIL_SERVER_HOST && process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD) {
        providers.push(
            EmailProvider({
                server: {
                    host: process.env.EMAIL_SERVER_HOST,
                    port: process.env.EMAIL_SERVER_PORT ? +process.env.EMAIL_SERVER_PORT : undefined,
                    auth: {
                        user: process.env.EMAIL_SERVER_USER,
                        pass: process.env.EMAIL_SERVER_PASSWORD,
                    },
                },
                from: process.env.EMAIL_FROM ?? 'NextJS Website',
                async sendVerificationRequest({ identifier: email, url, provider: { server, from } }) {
                    const { host } = new URL(url);
                    const transport = nodemailer.createTransport(server);
                    await transport.sendMail({
                        to: email,
                        from,
                        subject: `Entrar em ${host}`,
                        text: text({ url, host }),
                        html: html({ url, host, email }),
                    });
                },
            }),
        );
    }

    if (process.env.APPLE_ID && process.env.APPLE_ID_SECRET) {
        providers.push(
            AppleProvider({
                clientId: process.env.APPLE_ID,
                clientSecret: process.env.APPLE_ID_SECRET,
            }),
        );
    }

    if (process.env.AUTH0_ID && process.env.AUTH0_SECRET) {
        providers.push(
            Auth0Provider({
                clientId: process.env.AUTH0_ID,
                clientSecret: process.env.AUTH0_SECRET,
            }),
        );
    }

    if (process.env.FACEBOOK_ID && process.env.FACEBOOK_SECRET) {
        providers.push(
            FacebookProvider({
                clientId: process.env.FACEBOOK_ID,
                clientSecret: process.env.FACEBOOK_SECRET,
            }),
        );
    }

    if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
        providers.push(
            GithubProvider({
                clientId: process.env.GITHUB_ID,
                clientSecret: process.env.GITHUB_SECRET,
            }),
        );
    }

    if (process.env.GOOGLE_ID && process.env.GOOGLE_SECRET) {
        providers.push(
            GoogleProvider({
                clientId: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_SECRET,
            }),
        );
    }

    if (process.env.TWITTER_ID && process.env.TWITTER_SECRET) {
        providers.push(
            TwitterProvider({
                clientId: process.env.TWITTER_ID,
                clientSecret: process.env.TWITTER_SECRET,
            }),
        );
    }

    return providers;
};

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
    adapter: PrismaAdapter(prisma),
    // https://next-auth.js.org/configuration/providers
    providers: getProviders(),
    // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
    // https://next-auth.js.org/configuration/databases
    //
    // Notes:
    // * You must install an appropriate node_module for your database
    // * The Email provider requires a database (OAuth providers do not)
    //database: process.env.DATABASE_URL,

    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.SECRET,

    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: 'database',

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours
    },

    // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
        // A secret to use for key generation. Defaults to the top-level `secret`.
        secret: process.env.SECRET,
        // The maximum age of the NextAuth.js issued JWT in seconds.
        // Defaults to `session.maxAge`.
        maxAge: 60 * 60 * 24 * 30,
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behavior.
        //async encode({ secret, token, maxAge }) {},
        //async decode({ secret, token }) {},
    },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
        // signIn: '/auth/signin',  // Displays signin buttons
        // signOut: '/auth/signout', // Displays form with sign out button
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        // async signIn({ user, account, profile, email, credentials }) { return true },
        // async redirect({ url, baseUrl }) { return baseUrl },
        jwt: async ({ token }) => {
            return token;
        },
        session: async ({ session, user }) => {
            const data = await prisma.user.findUnique({
                where: { id: user.id },
                select: { username: true, role: true },
            });

            session.user.id = user.id;
            session.user.username = data?.username;
            session.user.role = data?.role;
            return session;
        },
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // Enable debug messages in the console if you are having problems
    debug: process.env.NODE_ENV !== 'production' && process.env.NEXTAUTH_DEBUG ? true : false,

    //Theme options
    theme: {
        colorScheme: 'auto',
        //brandColor: '',
        logo: '/img/favicon.png',
    },
});

// Email HTML body
function html({ url, host, email }: Record<'url' | 'host' | 'email', string>) {
    // Insert invisible space into domains and email address to prevent both the
    // email address and the domain from being turned into a hyperlink by email
    // clients like Outlook and Apple mail, as this is confusing because it seems
    // like they are supposed to click on their email address to sign in.
    const escapedEmail = email.replace(/\./g, '&#8203;.');
    const escapedHost = host.replace(/\./g, '&#8203;.');

    // Some simple styling options
    const backgroundColor = '#f9f9f9';
    const textColor = '#444444';
    const mainBackgroundColor = '#ffffff';
    const buttonBackgroundColor = '#346df1';
    const buttonBorderColor = '#346df1';
    const buttonTextColor = '#ffffff';

    return `
  <body style="background: ${backgroundColor};">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
          <strong>${escapedHost}</strong>
        </td>
      </tr>
    </table>
    <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
          Entrar com <strong>${escapedEmail}</strong>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Entrar</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
            Se você não solicitou este e-mail, pode ignorá-lo com segurança.
        </td>
      </tr>
    </table>
  </body>
  `;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: Record<'url' | 'host', string>) {
    return `Entrar em ${host}\n${url}\n\n`;
}
