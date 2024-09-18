# [kubell Engineer Summer Internship 2024](https://recruit.chatwork.com/internship/2024/engineer.html)

kubellエンジニアサマーインターンシップ2024では、CQRS/イベントソーシングという設計パターンを用いて構築されたチャットシステムを題材にプロダクト開発を行います。このシステムはサーバー/クライアントともにTypeScriptで実装されており、通信にはGraphQLが採用されています。

## 開発環境セットアップ(GitHub Codespaces)

今回のインターンシップではGitHub Codespacesによる開発環境構築を利用し、環境の統一を行います。

### ブラウザ上で開発を始める

1. `<>Code` ボタンから `Codespaces` タブを選択
2. `Create codespace on main` ボタンを押す
3. しばらく待つとブラウザ上でVSCodeが立ち上がります
4. 左上のハンバーガーメニューから`My Codespaces` を選択し、Codespacesの管理画面に飛ぶ
5. 今回作った環境が `Owned by chatwork` であれば、支払い先がChatworkになっているのでOKです
   `Owned by [自分のユーザー名]` であれば、支払い先が自分になっているので教えてください
6. [Codespaces上での開発について](./docs/how_to_use_codespace.md)を読んで開発を進めましょう！

### ローカルのVSCode上で開発する

ローカルのVSCodeをCodespacesに接続して開発を行うこともできます。
VSCodeのインストールは完了している前提です。

1. ブラウザ上のCodespaces内のハンバーガーメニューから`Open in Visual Studio Code`を選択
2. ローカルのVSCodeが自動的に起動します(必要な拡張機能も自動でインストールされます)

### 動作確認

バックエンド、フロントエンドそれぞれの動作確認方法は以下を参考にしてください。

- [バックエンドの動作確認](./docs/getting_started_backend.md)
- [フロントエンドの動作確認](./docs/getting_started_backend.md)

ルートディレクトリ下で以下のコマンドを実行することでバックエンド,フロントエンドを同時に立ち上げることもできます。

```
# すべてのアプリケーションをビルド
pnpm generate:all
pnpm docker:build-backend

# すべてのアプリケーションを立ち上げる
pnpm start:all

# 動作確認
pnpm e2e:verify-group-chat
```

### ログインできるユーザーについて
本アプリケーションの認証・認可の機能は省略されており、任意のULIDをユーザーIDとして用いてユーザーの識別を行っています。
フロントエンドでユーザー名とユーザーIDの組みを固定値として保存しており、ログイン画面ではユーザー名を入力することでログインできるようにしています。

| ユーザー名 | ユーザー ID                  |
| ---------- | ---------------------------- |
| `pl00`     | `UserAccount-01H42K4ABWQ5V2XQEP3A48VE0Z` |
| `pl01`     | `UserAccount-01H7Y7GDFJDTDRSY1DPRWMQ46P` |
| `pl02`     | `UserAccount-01H7Y7GYN3XHNDJ4M9M2F94TM6` |
| `pl03`     | `UserAccount-01H830ND9RHS205X925SQ8RF8V` |
| `pl04`     | `UserAccount-01H830NQA1RYYHVEBXX8T6WY7N` |
| `pl05`     | `UserAccount-01H830PAM7ZRABTATAA1R7KA4X` |

登録されているユーザーの情報は、[packages/frontend/src/mocks/dummy-user.ts](./packages/frontend/src/mocks/dummy-user.ts) に記述されています。

## 各種ドキュメントリンク

- [バックエンドアーキテクチャ](./docs/architecture_backend.md)
- [フロントエンドアーキテクチャ](./docs/architecture_frontend.md)
- [技術スタック](./docs/technology_stack.md)
