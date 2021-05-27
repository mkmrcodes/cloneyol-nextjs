import axios from 'axios';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../utils/auth';
import { nestApiUrl } from '../../../utils/constants';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const user = await axios.get(
          `${nestApiUrl}/users/check/${credentials.email}`
        );
        //console.log('user: ', user.data);

        if (!user) {
          throw new Error('No User Found');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.data.password
        );

        if (!isValid) {
          throw new Error('Could not log u in');
        }

        return {
          id: user.data.userId,
          email: user.data.email,
          isAdmin: user.data.isAdmin,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },
    session: async (session, user) => {
      session.user = user.user;
      return Promise.resolve(session);
    },
  },
});
