## 概要

**チャットアプリ**

[demo](https://realtime-chat-89735.web.app/)

名前を記入して入室し、メッセージを書き込めるチャットアプリです。任意の人数が参加でき、チャット送信をすると即座に全員の画面に反映されます。

### 使用技術

React(TypeScript), Redux, Firestore, styled-components

- chat のリアルタイム表示には Firestore の[onSnapshot](https://firebase.google.com/docs/firestore/query-data/listen?hl=ja)メソッドを利用しました。
- 状態管理には redux を用いています。
- TypeScript を使用して型安全なコードを意識しました。
- firestore にセキュリティルールを設定することで予期せぬスキーマが db に登録されないようにしました。
- コードフォーマッターには Prettier、静的検証には eslint を用いています。
- scrollIntoViewメソッドを用いて自動スクロール(投稿すると自動で下までスクロールする)機能を実装しました。

### 配色の参考

[Happy Hues](https://www.happyhues.co/palettes/6)
