export interface User {
  /**
   * フロントエンド上でユーザーを識別するID。自由文字列。
   */
  name: string;

  /**
   * サーバー上でユーザーを識別するID。ULIDを用いる。
   *  */
  id: string;
}
