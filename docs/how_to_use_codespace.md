# GitHub CodeSpaceについて

今回のインターンシップではGitHub Codespacesによる開発環境構築を利用し、環境の統一を行います。
利用方法、注意点など一読お願いします！

## 開発環境セットアップ(GitHub Codespaces)
Codespacesを使った開発を始めるための手順です
ブラウザとVScodeのどちらでも開発を始めることができます
おすすめはVScode上で開発を進めることですが、お好みの方をご利用ください！

### ローカルのVScode上で開発を始める
0. GitHubのリポジトリを開く
1. `<>Code` ボタンから `Codespaces` タブを選択
2. `Create codespace on main` ボタンを押す
  しばらく待つとブラウザ上で立ち上がりますが、一旦無視で
3. 再度`Codespaces` タブに立ち上がったCodespacesが表示されるので、`Open in Visual Studio Code`を選択
4. ローカルのVScode上にCodespacesの実行環境で立ち上がります

#### VScodeで立ち上げたCodespacesを動かす
バックエンドアプリケーションの立ち上げ
基本的には[バックエンドの開発の進め方](./getting_started_backend.md)の手順に従ってください
```sh
# dockerを使わない場合
pnpm docker:compose-up-db
pnpm start:backend:all

# dockerでやる場合
# docker:build は少々時間がかかります。気長に待ちましょう...
pnpm docker:build
pnpm docker:compose-up
```

フロントエンドの立ち上げ
基本的には[フロントエンドの開発の進め方](./getting_started_frontend.md)の手順に従ってください
```sh
pnpm start
# or
pnpm build
pnpm preview
```


### ブラウザ上で開発を始める
0. GitHubのリポジトリを開く
1. `<>Code` ボタンから `Codespaces` タブを選択
2. `Create codespace on main` ボタンを押す
3. しばらく待つとブラウザ上でVSCodeが立ち上がります
4. 左上のハンバーガーメニューから`My Codespaces` を選択し、Codespacesの管理画面に飛ぶ
5. 今回作った環境が `Owned by chatwork` であれば、支払い先がChatworkになっているのでOKです
   `Owned by [自分のユーザー名]` であれば、支払い先が自分になっているので教えてください

#### ブラウザで立ち上げたCodespacesを動かす
バックエンドアプリケーションの立ち上げ
```sh
# dockerを使わない場合
pnpm docker:compose-up-db
pnpm start:backend:all

# dockerでやる場合
# docker:build は少々時間がかかります。気長に待ちましょう...
pnpm docker:build
pnpm docker:compose-up
```

アプリケーションが立ち上がりました
フロントエンドから、WriteとReadサーバーを叩けるように表示範囲を`Public`に変更しましょう
1. `ポート`を選択し
2. ポート番号`38080`の表示範囲を右クリックし、`ポートの表示範囲`から`Public`を選択
3. ポート番号`38082`の表示範囲を右クリックし、`ポートの表示範囲`から`Public`を選択

**フロントエンドアプリケーションの準備と立ち上げ**
公開したポートを使ってフロントエンドアプリケーションが叩くように修正します
`packages/frontend/src/application/graphqlClient.ts`を開いてください
`commandLink`のuriを、先ほど公開したポート番号38080の転送されたアドレスに変更してください
```ts
// commandLinkのuri
const commandLink = new HttpLink({
  uri: "38080ポートの転送されたアドレス/query",
});
```
同じく、`queryLink`のuriを、先ほど公開したポート番号38082の転送されたアドレスに変更してください
```ts
// queryLinkのuri
const queryLink = new HttpLink({
  uri: "38082ポートの転送されたアドレス/query",
});
```

フロントエンドアプリケーションの立ち上げ
```sh
cd packages/frontend
pnpm build
pnpm preview
```

## 気をつけてほしいこと
Codespacesは、一定時間操作がないと自動でシャットダウンされます。
そのため、長時間操作がない場合は、再度立ち上げ直す必要があります。

また、`日々の業務が終了`した時にはCodespacesを**停止**するようご協力をお願いします。
**削除**しちゃうと作業中の実装などが失われてしまう可能性があります！
削除する場合は、作業状況などをコミットすることをお忘れなく！！！
Codespacesはマシンスペックを選択できるようになっています。
スペックに応じて料金も加算されてしまうため、現在選択されているスペックから**変更しないよう**にお願いします。
もし、スペックが足りずに開発が滞っている場合は一度運営チームにご相談ください！

### Trouble shooting
#### `pnpm docker:compose-up`でエラーが出た場合
以下のようなエラーの場合が出た時には、`pnpm docker:build`を実行してください
これにより、必要なDockerイメージを取得し、ビルドします
```
pull access denied for cqrs-es-example-js, repository does not exist or may require 'docker login': denied: requested acc...
```
