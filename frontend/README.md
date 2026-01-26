# フロントエンド構成

## 概要

このプロジェクトは React を使用したフロントエンドアプリケーションです。

## 技術スタック

- Node.js(v22.22.0)

### 主要ライブラリ

| カテゴリ         | ライブラリ                                 | 用途                                                                           |
| ---------------- | ------------------------------------------ | ------------------------------------------------------------------------------ |
| **ルーティング** | React Router (`react-router-dom`)          | ページ遷移の管理                                                               |
| **状態管理**     | `useState` / `useContext` / TanStack Query | ローカル状態、グローバル状態（パスワード変更促進フラグなど）、サーバー状態管理 |
| **フォーム**     | React Hook Form + Zod                      | フォーム制御とバリデーション(sharedにスキーマ定義)                             |
| **スタイリング** | Tailwind CSS                               | ユーティリティファーストCSS                                                    |
| **テスト**       | Vitest / Playwright                        | ユニットテスト / E2Eテスト                                                     |
| **UIカタログ**   | Storybook                                  | コンポーネントの可視化・管理                                                   |

### 状態管理の使い分け

- **useState**: コンポーネント内のローカル状態(基本的にReact Hook Formが行う)
- **useContext**: パスワード変更促進フラグ、ログインユーザーのロール管理(複数画面・UI制御)
  ※ useContext ではサーバー同期が必要な状態は管理しない
- **TanStack Query**: マスタデータの取得、データ操作（CRUD）

## ディレクトリ構成

- src
  - api
    - API通信の共通処理（JSONのみ）
  - assets
    - 画像などの静的ファイル
  - components
    - UI: Button / Input など（Storybook管理）
    - Layouts: レイアウト系（Storybook管理）
  - contexts
    - auth: ログインユーザー情報(サーバーにリクエストしない画面をUXとして制御する用)
    - passwordUpdateContext: パスワード変更促進フラグ(初期パスワードのままや30日パスワードを変更していない場合!マークを出す用)
  - features
    - feature-name
      - pages: 画面コンポーネント
      - components: 機能専用UI
      - api: API呼び出し
      - hooks: カスタムフック
      - constants: 定数
  - pages※ pages は feature に属さない共通・例外的ページのみを配置
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

※環境変数はプロジェクト直下の `.env.example` を参照

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

- `utils/handleApiError` で一元管理し、適切なエラーページ（404, 403, 500）へ遷移
- `utils/authErrorGenerate` でサーバーへリクエストしない際もUX的に、制御する

## 単体テスト戦略

### テストパターン

すべての単体テストは **AAAパターン**（Arrange, Act, Assert）に従って記述

### 単体テスト対象

以下の汎用的・重要度の高いモジュールを単体テストでカバー：

| 対象                   | 理由                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| **components/UI/**     | 汎用的なベースコンポーネントのため                                                        |
| **api/**               | 汎用API関数のため                                                                         |
| **contexts/**          | アプリケーション全体で使用される状態管理のため                                            |
| **utils/**             | 汎用ユーティリティ関数のため                                                              |
| **features/\*/hooks/** | マスタデータフェッチ、ログイン処理など画面共通の処理や、Context操作などの副作用が多いため |

### 単体テスト対象外

以下は単体テストの対象外とし、他の手段でカバー：

| 対象                        | 対象外とする理由                                                     | カバー方法                           |
| --------------------------- | -------------------------------------------------------------------- | ------------------------------------ |
| **features/\*/api/**        | APIパス、HTTPメソッド、型定義のみで、汎用API関数を呼び出しているだけ | 汎用API関数のテストでカバー          |
| **features/\*/components/** | ベースコンポーネントにpropsを渡すだけのラッパー                      | ベースコンポーネントのテストでカバー |
| **pages/**, **routes/**     | ページ遷移やルーティングロジック                                     | E2Eテスト（Playwright）でカバー      |
| **フォームバリデーション**  | Zodスキーマ定義内で既にテスト済み                                    | Zodライブラリのテストに依存          |

## 開発

## 開発環境のセットアップ

### 前提条件

- Docker と Docker Compose がインストールされていること

### 起動方法

```bash

# 開発サーバー起動(詳しくはプロジェクトのREADME参照)
docker-compose -f docker-compose.dev.yml up --build -d

# Storybook起動
npm run storybook

# テスト実行
npm run test:unit          # Vitest
npm run test:e2e      # Playwright
```

## 追加開発

### 新規画面追加手順（例）

1. features/{feature-name}/pages に画面を作成
2. 必要に応じて features/{feature-name}/apiやutils を作成
3. サーバー通信は TanStack Query + カスタムフックで実装
4. routes/ にルーティングを追加
