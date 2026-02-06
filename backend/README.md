# バックエンド構成

## 概要

このプロジェクトは Express を使用したバックエンドアプリケーションです。

## 技術スタック

- Node.js(v22.22.0(LTS))
- TypeScript

### 主要ライブラリ

| カテゴリ                  | ライブラリ  | 用途                                                                                          |
| ------------------------- | ----------- | --------------------------------------------------------------------------------------------- |
| **サーバー**              | Express     | Webアプリケーションフレームワーク                                                             |
| **データベース**          | PostgreSQL  | 本番環境ではSupabase使用                                                                      |
| **ORM**                   | Prisma      | データベースアクセス・マイグレーション管理                                                    |
| **キャッシュ/セッション** | Redis       | トークン管理（JWT等のセッション情報）本番環境ではUpstash使用                                  |
| **バリデーション**        | Zod         | サーバーサイドバリデーション                                                                  |
| **メール送信**            | Resend      | メール送信（ユーザー作成時の初期パスワード通知） ※モダンなメール送信APIを試したかったため採用 |
| **テスト**                | Vitest      | ユニットテスト                                                                                |
| **フォーマッタ**          | Prettier    | セミコロンやクオーテーションなど簡単なルールのみ                                              |
| **リンター**              | ESLint 　　 | recommended程度                                                                               |

## ディレクトリ構成

```typescript

src/
├── base
│   ├── controller/            // レスポンス、エラーレスポンス等の汎用Controller
│   └── repository/            // トランザクション管理の汎用Repository
├── errors
│   ├── index.ts               // すべてのエラークラスをまとめて export する
│   ├── appError.ts            // 基底となる AppError クラス（FK違反や楽観的ロック違反、リソース未検出）
│   ├── authError.ts           // ログイン失敗、トークン無効、権限不足など
│   ├── csrfError.ts           // CSRFトークン不一致、検証失敗
│   ├── historyError.ts        // 履歴操作に関するビジネスルール違反（履歴の重複）
│   ├── passwordError.ts       // パスワードが異なるエラー
│   └── studentError.ts        // 学生データに関する制約（メールアドレスの重複）
├── features
│   └── [feature_name]         // 各機能（例: history, user, auth）
│       ├── route/             // Expressルーティング定義
│       ├── controller/        // HTTPリクエストの受け口、レスポンス送出
│       ├── service/           // ビジネスロジック、ドメインルール
│       ├── repository/        // DB操作（SQL発行、Prisma）
│       ├── utils/             // 当該機能内でのみ使用するヘルパー
│       └── *.module.ts        // DI（依存性注入）の定義ファイル
├── middleware
│   ├── index.ts               // 各ミドルウェアをエクスポートし、app.tsでの一括登録を容易にする
│   ├── authMiddleware.ts       // JWTの検証、セッション確認、および `req.user` へのRole注入
│   ├── csrfMiddleware.ts       // CSRFトークンの発行・照合（Cookie/Headerの比較など）
│   ├── validateMiddleware.ts   // Zod等を使用したリクエストボディ/クエリのスキーマバリデーション
│   ├── securityMiddleware.ts   // Helmet, CORS, Rate Limitなどのセキュリティ関連設定(使ってない)
│   ├── commonMiddleware.ts     // JSONパース、URLエンコード、Cookie Parser等の共通処理
│   ├── errorMiddleware.ts      // AppError以外の予期せぬ例外を検知し、スタックトレースをログ保存
│   ├── authMiddleware.test.ts  // 認証ロジックのユニットテスト
│   └── csrfMiddleware.test.ts  // CSRF対策のユニットテスト
├── types                       // サーバーサイド専用の型定義
├── utils                       // 全体で利用する汎用関数（Loggerとtokenのブラックリスト
│   └── tokenBlacklist.ts       // ログアウト済みトークントークンの管理（Redis等との連携）
├── app.ts                      // Expressアプリ定義、共通ミドルウェア・ルート登録
├── buildAppModules.ts          // アプリケーション全体のDIコンテナ構築・紐付け
├─── server.ts                  // Listen実行、サーバー起動・停止処理
└─── Dockerfile                 // コンテナイメージビルド用
```

## アーキテクチャ

### レイヤー構成

Route →(+Middleware) → Controller → Service → Repository → Database

| レイヤー       | 責務                                             |
| -------------- | ------------------------------------------------ |
| **Route**      | エンドポイント定義、ミドルウェアの適用           |
| **Middleware** | 認証・認可、ログ、バリデーション等の横断的関心事 |
| **Controller** | HTTPリクエスト/レスポンスの処理、入力の受け取り  |
| **Service**    | ビジネスロジックの実装                           |
| **Repository** | データベース操作の抽象化                         |

### 依存性注入

- 各機能の `*.module.ts` で依存関係を定義
- `buildAppModules.ts` でアプリケーション全体の依存関係を構築
- Controller、Service、Repository の疎結合を実現

### エラーハンドリング

`errors/` で定義されたカスタムエラーをservice層がthrowする。
カスタムエラーは、`httpコード,メッセージ,識別コード`をAPIのレスポンス同様に持つ

### トランザクション管理

- `repositories/` のベースリポジトリで共通化
- 各機能でトランザクション処理を個別に定義する必要がない

## ミドルウェアの適用例

```typescript
// app.ts
app.use(
  API_ROUTES.PASSWORD, //URL指定
  authMiddleware, //認証
  requireRole([ROLE.STUDENT]), //認可
  passwordRoutes, //ルーティング
);
```

## ルートの例

```typescript
router.put(
  //httpメソッド指定
  '/:id', //ルーティング
  csrfMiddleware, //データが送られる場合は,csrfトークン検証
  validateBody(HistoryServerUpdateSchema), //入力項目のバリデーション
  historyController.updateHistory, //コントローラー
);
```

## コントローラーの例

```typescript
//汎用controller内の関数を用いて、httpレスポンスとエラーを対応
//httpレスポンスには、httpコード、データ(JSON)、識別コード、メッセージ
//serviceの関数の呼び出しのみ
createHistory = this.asyncHandler<HistoryResponse[]>(async (req, res) => {
  const history = await this.historyService.createHistory(req.body);
  return this.created(res, history);
});
```

## サービスの例

```typescript
//対応するリポジトリを呼び出しDB操作
//ビジネスロジックエラーの際は例外を投げる
//例外には、httpコード、データ(null)、識別コード、メッセージ
  async getHistory(historyId: string): Promise<HistoryResponse> {
    const history = await this.historyRepo.findById(historyId);
    if (history == null) throw new NotFoundError();
    return toHistoryResponse(history);
  }
```

## リポジトリ

prismaを用いてDB操作を行う
マッピングなどはserviceが行い、リポジトリでは、生データを扱う

## 認証フロー

### 1. ログイン

1. クライアントが `POST /login` でログインリクエスト
2. バックエンドがJWT + CSRFトークンを発行
3. JWTはCookieに、CSRFトークンはレスポンスボディで返却

### 2. API呼び出し

1. クライアントがCookie（JWT）とHeader（CSRFトークン）を付けてAPIリクエスト
2. バックエンドがトークンをSHA-256でハッシュ化
3. Redisのブラックリストに存在するか確認
4. ブラックリストになければ、リクエストを処理してレスポンス

### 3. ログアウト

1. クライアントが `POST /logout` でログアウトリクエスト
2. バックエンドがトークンをSHA-256でハッシュ化
3. Redisのブラックリストに追加（TTL: 1時間）
4. `200 OK` を返却

### セキュリティ対策

- **SQLインジェクション対策**
  - Prisma（ORM）を使用し、プレースホルダベースのクエリ発行を基本とする
  - 生SQLの使用は最小限に抑える方針

- **XSS（クロスサイトスクリプティング）対策**
  - React の自動エスケープ機構を利用
  - `dangerouslySetInnerHTML` は使用しない設計

- **CSRF対策**
  - Cookie に保存した JWT と併せて CSRF トークンを利用

- **ブルートフォース攻撃対策**
  - ログインAPIに対してミドルウェアによるリクエスト制限を実施
  - 開発環境では利便性のため無効化

- **タイミング攻撃対策**
  - 存在しないユーザーに対してもダミーのハッシュ計算を行い、
    認証処理時間に差が出ないよう制御

- **認証情報保護**
  - 認証トークンは HttpOnly Cookie に保存

## データベースマイグレーション

### 開発環境

Docker起動時に自動で実行されます。

```bash
# docker-compose up 時に自動実行
npx prisma migrate dev  # マイグレーション適用
npx prisma db seed      # シードデータ投入
```

## シードデータ

開発環境では以下のテストデータが自動投入されます：

### マスタデータ

| マスタ                   | 説明                 |
| ------------------------ | -------------------- |
| **大分類マスタ**         | 学生寮の大分類(大隊) |
| **中分類マスタ**         | 学生寮の中分類(中隊) |
| **小分類マスタ**         | 学生寮の小分類(小隊) |
| **学科マスタ**           | 学科情報             |
| **ステータス区分マスタ** | 各種ステータス区分   |

### テストデータ

| データ種別         | 件数   | 説明                     |
| ------------------ | ------ | ------------------------ |
| **管理者ユーザー** | 1件    | システム管理者アカウント |
| **学生データ**     | 複数件 | テスト用の学生情報       |
| **履歴データ**     | 複数件 | テスト用の履歴情報       |

### 管理者アカウント

管理者アカウントでログインできます：

| 項目               | 値                  |
| ------------------ | ------------------- |
| **メールアドレス** | `admin@exmaple.com` |
| **パスワード**     | `admin123`          |

### 学生アカウント

ダミー学生アカウントでログイン(resendがなくても体験できるように)できます：

| 項目               | 値                   |
| ------------------ | -------------------- |
| **メールアドレス** | `{guid}@exmaple.com` |
| **パスワード**     | `123456`             |

## 単体テスト戦略

### テストパターン

すべての単体テストは **AAAパターン**（Arrange, Act, Assert）に従って記述

### 単体テスト対象

以下の重要度の高いモジュールを単体テストでカバー：

| 対象                               | 理由                                                             |
| ---------------------------------- | ---------------------------------------------------------------- |
| **Middleware**                     | 認証・認可、バリデーション等のアプリケーション全体に影響する処理 |
| **Service**                        | ビジネスロジックの中核                                           |
| **Utils**                          | 汎用関数の動作保証                                               |
| **Repository（複雑なクエリのみ）** | 複雑な結合や集計処理の正確性を保証                               |

### 単体テスト対象外

以下は単体テストの対象外とし、他の手段でカバー：

| 対象                         | 対象外とする理由                                                   | カバー方法                                  |
| ---------------------------- | ------------------------------------------------------------------ | ------------------------------------------- |
| **Repository（単純なCRUD）** | 単純なSELECT、INSERT、UPDATE、DELETE（論理削除含む）はPrismaに依存 | Prismaの動作に依存、必要に応じてE2Eでカバー |
| **Controller**               | 薄いレイヤー（リクエスト/レスポンスの受け渡しのみ）                | E2Eテストでカバー                           |
| **Route**                    | ルーティング定義のみ                                               | E2Eテストでカバー                           |
| **Module**                   | 依存関係の定義のみ                                                 | -                                           |

## テスト実行

```bash
npm run test:unit # Vitest
```

## 今後の改善予定・検討事項

- **ページネーション対応**
  - Prisma を使用しているため、skip / take を用いたページネーションを実装したい

- **バッチ処理の実装**
  - 進級等に伴う学生情報の一括更新を想定
  - 現在は設計・学習段階

- **運用を意識したログ設計・バックアップリストア**
  - 運用時に意味のあるログ・バックアップおよびリストア手順の整備を検討
  - **Sentry**とか使ってみたい

-　**anyを使わない**
