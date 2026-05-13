export const AUTH_COOKIE_NAME = 'draft.gg.token';

export const NEXT_AUTH_COOKIES = [
  'next-auth.session-token',
  'next-auth.callback-url',
  'next-auth.csrf-token',
  'next-auth.pkce.code_verifier',
  'next-auth.state',
] as const;
