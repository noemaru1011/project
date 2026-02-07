# dockerコマンドまとめ

```bash

# dockerコンテナをビルド
docker-compose -f docker-compose.dev.yml up --build -d

# dockerコンテナをシャッドダウン
docker-compose -f docker-compose.dev.yml down

# dockerコンテナのログの確認(backendをよく確認するため)
docker-compose -f docker-compose.dev.yml logs -f backend

# dcokerのコンテナ内に入る
docker exec -it コンテナID /bin/bash

```
