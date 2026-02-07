# ==========================================
# 1. Base Stage (共通のベース環境)
# ==========================================
FROM node:22.22.0-slim AS base

# Prismaに必要なシステムライブラリをインストール
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# ==========================================
# 2. Dependencies Stage (依存関係のインストール)
# ==========================================
FROM base AS dependencies

# 設定ファイルのコピー
COPY package.json package-lock.json tsconfig.json ./
COPY backend/package.json backend/package-lock.json backend/tsconfig.json ./backend/
COPY shared ./shared
COPY backend/prisma ./backend/prisma

# 依存関係のインストール
RUN npm ci

# ==========================================
# 3. Development Stage (開発用)
# ==========================================
FROM dependencies AS development

WORKDIR /app/backend
ENV NODE_ENV=development

# 開発時はソースをマウントするため、Prisma Clientの生成のみ行う
COPY backend/prisma ./prisma
RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "run", "dev"]


