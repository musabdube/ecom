// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../../lib/prisma'; // Adjust the path to your Prisma setup
import { compare } from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Check if the user exists in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          throw new Error('User not found');
        }

        // Compare passwords
        const isPasswordValid = await compare(credentials?.password || '', user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        // Return user object on successful login
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: '/login', // Redirect to this page on login error
    error: '/api/auth/error', // Handle errors
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
