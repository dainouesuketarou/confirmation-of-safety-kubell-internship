import { useContext } from 'react';

import { AuthContext } from './AuthProvider';
import { findUserByName } from './tools';
import type { User } from './models';

export class UserNotSignedInError extends Error {}

/**
 * 現在サインインしているユーザーを取得する
 * @throws {UserNotSignedInError} ユーザーがサインインしていない場合エラーをスロー
 * @returns nullでないUserオブジェクト
 */
export const useSignedInUser = (): User => {
  const { signedInUser } = useContext(AuthContext);

  if (signedInUser === null) {
    throw new UserNotSignedInError('ユーザーがサインインしていません');
  }

  return signedInUser;
};

/**
 * ログイン処理を行うユースケース関数を取得する
 * @returns ユーザー名を受け取り、ログイン処理を行う関数
 */
export const useSignInUseCase = () => {
  const { setSignedInUser } = useContext(AuthContext);
  return (name: string) => setSignedInUser(findUserByName(name));
};
