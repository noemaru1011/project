# バックエンド構成

## 概要

このプロジェクトは Express を使用したバックエンドアプリケーションです。

## 技術スタック

### 主要ライブラリ

| カテゴリ | ライブラリ | 用途 |
|---------|-----------|------|
| **サーバー** | Express | Webアプリケーションフレームワーク |
| **ORM** | Prisma | データベースアクセス・マイグレーション管理 |
| **バリデーション** | Zod | サーバーサイドバリデーション |
| **テスト** | Vitest | ユニットテスト |

## ディレクトリ構成

- src
  - errors
    - FK違反、楽観的ロック、重複違反などのDB系エラー
    - ビジネスロジックエラー
    - 認証エラー（例外）を定義
  - features
    - 各機能別のモジュール
    - route
      - ルーティング定義
    - Controller
      - HTTPリクエスト/レスポンスの入り口
    - service
      - ビジネスロジック
    - repository
      - DB操作
    - utils
      - serviceを支えるヘルパー関数
    - *.module.ts
      - 依存関係の注入
  - middleware
    - 認証 + 認可
    - ログ収集
    - サーバーサイドバリデーション（Zod）
    - CORS、Cookie等の汎用ミドルウェア
  - repositories
    - ベースリポジトリ
    - トランザクション処理を共通化（毎回定義不要）
  - types
    - サーバーサイド専用の型定義
  - utils
    - ログ収集などの汎用関数
  - app.ts
    - ルーティングとミドルウェアの定義
    - 例: `app.use(API_ROUTES.HISTORY_SEARCH, authMiddleware, requestLogger, historySearchRoutes);`
  - buildAppModules.ts
    - 依存関係の構築（routeにControllerを紐付け）
  - server.ts
    - サーバー起動処理
- Dockerfile
  - Docker設定ファイル

## アーキテクチャ

### レイヤー構成

Route →(Middleware) → Controller → Service → Repository → Database


| レイヤー | 責務 |
|---------|------|
| **Route** | エンドポイント定義、ミドルウェアの適用 |
| **Controller** | HTTPリクエスト/レスポンスの処理、入力の受け取り |
| **Service** | ビジネスロジックの実装 |
| **Repository** | データベース操作の抽象化 |
| **Middleware** | 認証・認可、ログ、バリデーション等の横断的関心事 |

### 依存性注入

- 各機能の `*.module.ts` で依存関係を定義
- `buildAppModules.ts` でアプリケーション全体の依存関係を構築
- Controller、Service、Repository の疎結合を実現

### エラーハンドリング

`errors/` で定義されたカスタムエラー：

- **DB系エラー**: FK違反、楽観的ロック、重複違反
- **ビジネスロジックエラー**: ドメイン固有のエラー
- **認証エラー**: 未認証、権限不足

### トランザクション管理

- `repositories/` のベースリポジトリで共通化
- 各機能でトランザクション処理を個別に定義する必要がない

## ミドルウェアの適用例

```typescript
// app.ts
app.use(
  API_ROUTES.HISTORY_SEARCH,
  authMiddleware,        // 認証・認可
  requestLogger,         // リクエストログ
  historySearchRoutes    // ルーティング
);
```

ミドルウェアは以下の順序で適用：

認証・認可チェック
ログ収集
バリデーション
ビジネスロジック実行
