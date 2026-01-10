# ==========================================
# 1. Base Stage
# ==========================================
FROM node:22.2-slim AS base
WORKDIR /app

# ==========================================
# 2. Dependencies Stage
# ==========================================
FROM base AS dependencies
# frontendディレクトリの内容をコピー（package.jsonなど）
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

# ==========================================
# 3. Development Stage (開発用)
# ==========================================
FROM dependencies AS development
# ソースコードをコピー（開発時はvolumesで上書きされますがビルド用）
COPY frontend/ ./
EXPOSE 5173
# 外部（ホスト）からアクセスできるように --host 0.0.0.0 を指定
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ==========================================
# 4. Build Stage (ビルド用)
# ==========================================
FROM dependencies AS build
COPY frontend/ ./
# 環境変数をビルド時に注入（必要に応じて）
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

# ==========================================
# 5. Production Stage (本番用: Nginx)
# ==========================================
FROM nginx:stable-alpine AS production
# デフォルトのNginx設定で、/usr/share/nginx/html 配下のファイルを配信します
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

