# 環境変数

このディレクトリには開発環境・本番環境の環境変数ファイルが格納されています。

## ファイル構成

- `.env.example` - 環境変数のテンプレート
- `.env.dev` - 開発環境用（Docker Composeが自動読み込み）
- `.env.prod` - 本番環境用

## セットアップ

Docker Composeが自動的に `.env.dev` を読み込むため、特別な設定は不要です。

必要に応じて `.env.dev` を編集してください。

## 環境変数一覧

### Database (PostgreSQL)

| 変数名 | 説明 | デフォルト値 |
| --- | --- | --- |
| `POSTGRES_USER` | PostgreSQLユーザー名 | `postgres` |
| `POSTGRES_PASSWORD` | PostgreSQLパスワード | `postgres` |
| `POSTGRES_DB` | データベース名 | `postgres` |
| `POSTGRES_HOST` | ホスト名（Docker内） | `db` |
| `POSTGRES_PORT` | ポート番号（Docker内） | `5432` |
| `DATABASE_URL` | Prisma接続文字列 | `postgresql://postgres:postgres@db:5432/postgres?schema=public` |

#### Redis

| 変数名 | 説明 | デフォルト値 |
| --- | --- | --- |
| `REDIS_URL` | Redis接続文字列 | `redis://redis:6379` |

#### Backend

| 変数名 | 説明 | 必須 | デフォルト値 |
| --- | --- | --- | --- |
| `NODE_ENV` | 実行環境 | ✅ | `development` |
| `JWT_SECRET` | JWT署名用シークレットキー | ✅ | 任意の文字列を設定 |
| `RESEND_API_KEY` | Resend APIキー |  | [Resend](https://resend.com)で取得 |
| `BACK_PORT` | バックエンドポート（Docker内） | ✅ | `3000` |
| `BACK_HOST` | バックエンドホスト | ✅ | `0.0.0.0` |
| `BACK_URL` | バックエンドURL（外部アクセス用） | ✅ | `http://localhost:3001` |

#### Frontend

| 変数名 | 説明 | 必須 | デフォルト値 |
| --- | --- | --- | --- |
| `VITE_API_BASE_URL` | バックエンドAPIのベースURL | ✅ | `http://localhost:3001` |
| `FRONT_URL` | フロントエンドURL | ✅ | `http://localhost:5173` |

#### Docker Compose Host Ports

| 変数名 | 説明 | デフォルト値 |
| --- | --- | --- |
| `HOST_DB_PORT` | ホストマシンからアクセスするDBポート | `5433` |
| `HOST_BACKEND_PORT` | ホストマシンからアクセスするバックエンドポート | `3001` |
| `HOST_REDIS_PORT` | ホストマシンからアクセスするRedisポート | `6378` |

### アクセスURL

開発環境起動後、以下のURLでアクセスできます：

- **フロントエンド**: `http://localhost:5173`
- **バックエンドAPI**: `http://localhost:3001`
- **PostgreSQL**: `localhost:5433`（ホストマシンから）
- **Redis**: `localhost:6378`（ホストマシンから）

### 注意事項

- `JWT_SECRET` は本番環境では必ず強力なランダム文字列を設定してください
- `RESEND_API_KEY` は [Resend](https://resend.com) でアカウント作成後に取得できます
- Docker内部とホストマシンでポート番号が異なる点に注意してください
