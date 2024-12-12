import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '@/lib/api-config/methods';

export function DeleteTask(taskId) {
  return handleDeleteMethod(`/api/todo-list?taskId=${taskId}`);
}

export function UpdateTask(data) {
  return handlePatchMethod('/api/todo-list', data);
}

export function CreateTask(data) {
  return handlePostMethod('/api/todo-list', data);
}

export function ListTasks() {
  return handleGetMethod('/api/todo-list');
}
