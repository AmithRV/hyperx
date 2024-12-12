import { handleGetMethod } from '@/lib/api-config/methods';

export function ListCategoriesWithTasks() {
  return handleGetMethod('/api/todo-list/categories/categories-with-tasks');
}
