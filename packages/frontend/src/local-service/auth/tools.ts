import { REGISTERED_USERS } from 'mocks/dummy-user';

import type { User } from 'local-service/auth/models';

export class UserNotRegisteredError extends Error {}

export function findUserByName(name: string): User {
  const user = REGISTERED_USERS.find((u) => u.name === name);
  if (user === undefined) {
    throw new UserNotRegisteredError(`ユーザー ${name} は登録されていません`);
  }
  return user;
}

export function findUserById(id: string): User {
  const user = REGISTERED_USERS.find((u) => u.id === id);
  if (user === undefined) {
    throw new UserNotRegisteredError(`ユーザー ${id} は登録されていません`);
  }

  return user;
}
