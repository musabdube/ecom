import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../../lib/prisma';
import { compare } from 'bcryptjs';

const authHandler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email || '' },
          });

          if (!user) {
            throw new Error('User not found');
          }

          const isPasswordValid = await compare(credentials?.password || '', user.password);
          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          return { id: user.id.toString(), name: user.name, email: user.email };
        } catch (error) {
          console.error('Error in authorize function:', error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/api/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
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

export { authHandler as GET, authHandler as POST };
