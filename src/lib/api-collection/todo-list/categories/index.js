import { handleGetMethod, handlePostMethod } from '@/lib/api-config/methods';

export function ListCategories() {
  return handleGetMethod('/api/todo-list/categories');
}

export function CreateCategory(data) {
  return handlePostMethod('/api/todo-list/categories', data);
}
