# フロントエンド構成

## 概要

このプロジェクトは React を使用したフロントエンドアプリケーションです。

## 技術スタック

### 主要ライブラリ

| カテゴリ | ライブラリ | 用途 |
|---------|-----------|------|
| **ルーティング** | React Router (`react-router-dom`) | ページ遷移の管理 |
| **状態管理** | `useState` / `useContext` / TanStack Query | ローカル状態、グローバル状態（パスワード変更フラグ等）、サーバー状態管理 |
| **フォーム** | React Hook Form + Zod | フォーム制御とバリデーション |
| **スタイリング** | Tailwind CSS | ユーティリティファーストCSS |
| **テスト** | Vitest / Playwright | ユニットテスト / E2Eテスト |
| **UIカタログ** | Storybook | コンポーネントの可視化・管理 |

### 状態管理の使い分け

- **useState**: コンポーネント内のローカル状態
- **useContext**: パスワード変更促進フラグ、ログインユーザーのロール管理
- **TanStack Query**: マスタデータの取得、データ操作（CRUD）

## ディレクトリ構成
src/
├── api/ # API通信の汎用関数
│ └── ... # 汎用fetchラッパー（CSRF、JWT自動付与）
│ # ※JSON専用（バイナリファイルは非対応）
│
├── assets/ # 静的ファイル（画像など）
│
├── components/ # 共通UIコンポーネント
│ ├── base/ # Button, Input等の基本コンポーネント
│ └── layout/ # レイアウトコンポーネント
│ # ※Storybookで管理
│
├── contexts/ # React Context定義
│ ├── PasswordChangeContext # パスワード変更フラグ
│ └── UserRoleContext # ログインユーザーロール
│
├── features/ # 機能別モジュール
│ └── [feature-name]/
│ ├── pages/ # 機能のページコンポーネント
│ ├── components/ # 機能固有のコンポーネント
│ ├── constants/ # 定数定義
│ ├── api/ # API呼び出し（汎用関数を使用）
│ └── hooks/ # カスタムフック
│ # （TanStack Query + Context操作など）
│
├── pages/ # 共通ページ
│ ├── Home # ホームページ
│ └── Error # エラーページ
│
├── routes/ # ルーティング定義
│
├── utils/ # 汎用ユーティリティ関数
│ └── errorHandling # エラーハンドリング（404, 403, 500遷移等）
│
├── App.tsx # アプリケーションルート
├── index.css # グローバルスタイル
└── main.tsx # エントリーポイント


## 設計方針

### API通信

- `api/` ディレクトリの汎用関数を使用
- APIパス、HTTPメソッド、リクエストボディを指定して呼び出し
- CSRF トークンと JWT は自動で付与
- **制限事項**: JSON形式のみ対応（ZIPファイル等のバイナリダウンロードは非対応）

### フォーム管理

- React Hook Form でフォーム制御
- Zod でスキーマ定義とバリデーション

### カスタムフック

基本的に TanStack Query を使用するが、以下の場合は独自フックを作成：

- Context の同時操作が必要な場合
- 副作用が複雑な場合

### エラーハンドリング

`utils/errorHandling` で一元管理し、適切なエラーページ（404, 403, 500）へ遷移

## 開発

```bash
# 開発サーバー起動
npm run dev

# Storybook起動
npm run storybook

# テスト実行
npm run test:unit          # Vitest
npm run test:e2e      # Playwright
