import { handleGetMethod, handlePostMethod } from '@/lib/api-config/methods';

export function UserLogin(data) {
  return handlePostMethod('/api/auth/login', data);
}

export function UserSignup(data) {
  return handlePostMethod('/api/auth/signup', data);
}

export function UserLogout() {
  return handleGetMethod('/api/auth/logout');
}
