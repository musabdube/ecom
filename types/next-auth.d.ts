import NextAuth from 'next-auth';
import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id?: string; // Ensure id is included
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id?: string;
  }
}
