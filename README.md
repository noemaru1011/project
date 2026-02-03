# 学生寮管理システム(個人開発・再現)

## 概要

大学時代の学生寮のシステムをWebアプリケーションとして再現した個人プロジェクトです。

### プロジェクトの目的

個人開発を通じて、以下の技術習得を目指しています：

- フルスタック開発（フロントエンド・バックエンド）
- システム・DB設計
- インフラ構築
- モダンな開発手法(GitHubActionsやコンテナ技術、生成AIなど)
- 外部APIの使用
- CI/CD

### システムの概要

学生寮に所属する学生の状態を一元管理するシステムです。

**管理する情報:**

- **誰が**: 学生名
- **いつからいつまで**: 期間（未定も可）
- **どこで**: 場所（病院、寮の部屋など）
- **どの状態**: ステータス（病気休暇、停学など）

**例:**

> 第3大隊学生寮の住吉さんが、12月1日から12月10日（もしくは未定）の間、○○病院で、病気休暇中

### 学生寮の組織構造

学生寮は階層構造になっております：

- 大隊（1〜4）: 4つの学生寮
  - 中隊: 各階ごと（例: 1大隊1階 = 11中隊）
    - 小隊: 中隊をさらに3分割（例: 111, 112, 113小隊）

- **大隊**: 4つ（第1〜第4大隊）
- **中隊**: 大隊ごとに4つ（各階）
- **小隊**: 中隊ごとに3つ
- **合計**: 1大隊あたり12小隊（4階 × 3小隊）
- (※webアプリのホームに組織図があります)

## 技術スタック

- Node.js(v22.22.0)
- TypeScript

### フロントエンド

- React + Vite
- TypeScript
- Tailwind CSS
- Zod（バリデーション）
- Storybook

### バックエンド

- Express
- Prisma（ORM）
- TypeScript
- Zod（バリデーション）
- Resend（メール送信）

### インフラ

- PostgreSQL(Supabase)
- Redis
- Docker / Docker Compose

### テスト

- vitest
- Playwright

 ### フォーマッター・リンター

 - Prettier
 - ESLint

### CI/CD

- GitHubActions:push時の単体テスト、コンパイルを行う(改修予定)
- Vercel:デプロイ
 
## プロジェクト構成
```
project/
├── .github/
│   └── # GitHub Actions: 自動テスト、コンパイルを行う(改修予定)
│
├── frontend/
│   └── # フロントエンド（React / Vite）: Feature-based アーキテクチャ
│
├── backend/
│   └── # バックエンド（Node.js / Express）: Feature-basedのController-Service-Repository 構成
│
├── shared/
│   └── # 共通資産: 型定義、Zodスキーマ、APIメッセージ、ルート定義（フロント・バック両方から参照）
│
├── envs/
│   └── # 環境変数管理: 実ファイルは gitignore
│
└──── docker-compose.dev.yml # 開発用コンテナ定義

```

各ディレクトリの詳細は、それぞれのREADMEを参照してください：

- [フロントエンド開発ガイド](./frontend/README.md)
- [バックエンド開発ガイド](./backend/README.md)
- [共通型定義](./shared/README.md)
- [環境変数設定](./envs/README.md)

## 環境構築

### 前提条件

- Docker と Docker Compose がインストールされていること
- env.devに環境変数が設定されていること
- 環境変数の詳細は [envs/README.md](./envs/README.md) を参照してください。

### 起動方法

#### 開発環境の起動（フロント・バック・DB・Redis全て起動）

```bash
docker-compose -f docker-compose.dev.yml up --build -d
```

### アクセスURL

起動後、以下のURLでアクセスできます：

- **フロントエンド**: <http://localhost:5173>
- **バックエンドAPI**: <http://localhost:3001>

### 停止方法

```bash
# 停止
docker-compose -f docker-compose.dev.yml down

# ログ確認
docker-compose -f docker-compose.dev.yml logs -f
```

## トラブルシューティング

### ポートが既に使用されている

## 使用中のポートを確認

**macOS / Linux:**

```bash
# 使用中のポートを確認
lsof -i :5173
lsof -i :3001

# プロセスを停止
kill -9 <PID>
```

**windows:**

```shell
netstat -ano | findstr :5173
netstat -ano | findstr :3001

# プロセスを停止
taskkill /PID <PID> /F
```

### Dockerコンテナが起動しない

```bash
# ログを確認
docker-compose -f docker-compose.dev.yml logs -f

# コンテナを再ビルド
docker-compose -f docker-compose.dev.yml up --build -d
```

### データベースをリセットしたい

## バックエンドコンテナに入る

```bash
docker-compose -f docker-compose.dev.yml exec backend sh
```

※自分はA5M2使ってます。

## データベースリセット（開発環境のみ）

```bash
npx prisma migrate reset
```

## ライセンス

Private（個人開発プロジェクト）
