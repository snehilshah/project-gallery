import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Response {
    error: string;
    ok: boolean;
    status: number;
    url: string;
  }
}
