import { handleGetMethod, handlePostMethod } from '@/lib/api-config/methods';

export function Login(data) {
  return handlePostMethod('/api/auth/login', { data });
}

export function Signup(data) {
  return handlePostMethod('/api/auth/signupn', { data });
}

export function Logout() {
  return handleGetMethod('/api/auth/logout');
}
