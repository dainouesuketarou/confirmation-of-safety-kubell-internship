# Intern 2024 フロントエンド

## 開発の進め方

### 事前準備

今回のインターンシップではGitHub Codespaceによる開発環境構築を利用し、環境の統一を行なっています。
[Codespaces上での開発について](./how_to_use_codespace.md)を読みましょう！

## 開発を始める

すべてのコマンドはルートディレクトリで実行してください。

#### 1. 依存関係をインストールする

開発に必要なツールやライブラリをインストールします。

```sh
pnpm install
```

#### 2. PrismaSchemaからPrismaClientを生成

開発に必要なツールやライブラリをインストールします。

```sh
pnpm generate:backend
```

#### 3.a ローカルマシンで動作確認

個人の環境で素早く動作確認を行いたい場合に使えます。

一般的には、デバッグの際には個人間で環境が違うことに注意する必要があります。
(Codespacesはこの欠点をカバーできているので、基本的にはこちらの方法で良いと思います。)

1. docker-composeでデータベースのみ実行する

```shell
pnpm docker:compose-up-db
```

2. アプリケーションをビルド・起動してデバッグ

```shell
pnpm docker:build-backend

pnpm start:backend:read-api
pnpm start:backend:write-api
pnpm start:backend:local-rmu

# 3アプリケーションを同時に起動したい場合
pnpm start:backend:all

# 動作確認
pnpm e2e:verify-group-chat
```

### 3.b Docker Composeを使って動作確認

チーム内で環境の一貫性を保って動作確認を行いたい場合に使えます。

毎度イメージビルドが必要になるので、個人環境での確認には向いていないです。

1. docker imageをビルドする

```shell
pnpm docker:build
```

2. アプリケーションとインフラを立ち上げる

```shell
pnpm docker:compose-up

# 動作確認
pnpm e2e:verify-group-chat

# 停止コマンド
pnpm docker:compose-down
```
