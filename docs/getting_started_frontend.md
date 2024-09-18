# Intern 2024 フロントエンド

## 開発の進め方
### 事前準備
今回のインターンシップではGitHub Codespaceによる開発環境構築を利用し、環境の統一を行なっています。
[Codespaces上での開発について](./how_to_use_codespace.md)を読みましょう！

### 開発を始める
すべてのコマンドは`frontend/` ディレクトリ下で実行してください

#### 1. 依存関係をインストールする
開発に必要なツールやライブラリをインストールします。
```sh
pnpm install
```

#### 2. GraphQLの型を生成する
バックエンドが定義した GraphQL スキーマと、`frontend/` 配下のコードの解析から TypeScript の型を生成します。
```sh
pnpm generate:frontend:all
```
生成された成果物は`frontend/src/__generated__`に配置されます。

#### 3. フロントエンドの開発用サーバーを起動する
開発用サーバーを `http://localhost:5173` で起動し、ブラウザで開きます。

```sh
pnpm start

# ビルドした成果物の場合
pnpm build
pnpm preview
```
