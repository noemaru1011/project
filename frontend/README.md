# フロントエンド構成

## 概要

このプロジェクトは React を使用したフロントエンドアプリケーションです。

## 技術スタック

### 主要ライブラリ

| カテゴリ | ライブラリ | 用途 |
|---------|-----------|------|
| **ルーティング** | React Router (`react-router-dom`) | ページ遷移の管理 |
| **状態管理** | `useState` / `useContext` / TanStack Query | ローカル状態、グローバル状態（パスワード変更フラグ等）、サーバー状態管理 |
| **フォーム** | React Hook Form + Zod | フォーム制御とバリデーション(sharedにスキーマ定義) |
| **スタイリング** | Tailwind CSS | ユーティリティファーストCSS |
| **テスト** | Vitest / Playwright | ユニットテスト / E2Eテスト |
| **UIカタログ** | Storybook | コンポーネントの可視化・管理 |


### 状態管理の使い分け

- **useState**: コンポーネント内のローカル状態(基本的にReact Hook Formが行う)
- **useContext**: パスワード変更促進フラグ、ログインユーザーのロール管理
- **TanStack Query**: マスタデータの取得、データ操作（CRUD）


## ディレクトリ構成
- src
  - api
    - API通信の共通処理（JSONのみ）
  - assets
    - 画像などの静的ファイル
  - components
    - UI: Button / Input など
    - Layouts: レイアウト系（Storybook管理）
  - contexts
    - auth: ログインユーザー情報
    - passwordUpdateContext: パスワード変更フラグ
  - features
    - feature-name
      - pages: 画面コンポーネント
      - components: 機能専用UI
      - api: API呼び出し
      - hooks: カスタムフック
      - constants: 定数
  - pages
    - Home
    - Error
  - routes: ルーティング定義
  - utils
    - handleApiError
    - authErrorGenerate
    - downloadBlob
  - App.tsx
  - index.css
  - main.tsx





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


## 単体テスト戦略

### テストパターン

すべての単体テストは **AAAパターン**（Arrange, Act, Assert）に従って記述

### 単体テスト対象

以下の汎用的・重要度の高いモジュールを単体テストでカバー：

| 対象 | 理由 |
|------|------|
| **components/UI/** | 汎用的なベースコンポーネントのため |
| **api/** | 汎用API関数のため |
| **contexts/** | アプリケーション全体で使用される状態管理のため |
| **utils/** | 汎用ユーティリティ関数のため |
| **features/*/hooks/** | マスタデータフェッチ、ログイン処理など画面共通の処理や、Context操作などの副作用が多いため |

### 単体テスト対象外

以下は単体テストの対象外とし、他の手段でカバー：

| 対象 | 対象外とする理由 | カバー方法 |
|------|-----------------|-----------|
| **features/*/api/** | APIパス、HTTPメソッド、型定義のみで、汎用API関数を呼び出しているだけ | 汎用API関数のテストでカバー |
| **features/*/components/** | ベースコンポーネントにpropsを渡すだけのラッパー | ベースコンポーネントのテストでカバー |
| **pages/**, **routes/** | ページ遷移やルーティングロジック | E2Eテスト（Playwright）でカバー |
| **フォームバリデーション** | Zodスキーマ定義内で既にテスト済み | Zodライブラリのテストに依存 |
## 開発

## 開発環境のセットアップ

### 前提条件

- Docker と Docker Compose がインストールされていること

### 起動方法

```bash
# 開発環境の起動
docker-compose -f docker-compose.dev.yml up --build -d

# 停止
docker-compose -f docker-compose.dev.yml down

# ログ確認
docker-compose -f docker-compose.dev.yml logs -f

# Storybook起動
npm run storybook

# テスト実行
npm run test:unit          # Vitest
npm run test:e2e      # Playwright
