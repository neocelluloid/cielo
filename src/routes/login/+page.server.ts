import { redirect, fail } from '@sveltejs/kit';
import { CredentialSession } from '@atproto/api';

export const actions = {
  default: async ({ request, cookies }) => {
    const form     = await request.formData();
    const handle   = form.get('handle')   as string;
    const password = form.get('password') as string;

    if (!handle || !password) {
      return fail(400, { error: 'Handle and password are required' });
    }

    try {
      const session = new CredentialSession(new URL('https://bsky.social'));
      await session.login({ identifier: handle, password });

      cookies.set('user_session', JSON.stringify(session.session), {
        path:     '/',
        httpOnly: true,
        secure:   true,
        sameSite: 'strict',
        maxAge:   60 * 60 * 24 * 7,
      });

      throw redirect(302, '/');
    } catch (e) {
      if (e.status) throw e;
      return fail(401, { error: 'Invalid handle or password' });
    }
  }
};