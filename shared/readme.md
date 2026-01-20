# 共通定義（Shared）

## 概要

フロントエンドとバックエンドで共有する定数、型定義、Zodスキーマを管理しています。

## ディレクトリ構成

- shared
  - constants
    - APIメッセージ（成功・失敗時のメッセージ）
  - models
    - 型定義とZodスキーマ
    - フロント・バック共通の型
  - routes
    - APIのURL定義

## 各ディレクトリの詳細

### constants/

APIレスポンスメッセージを定義

例:
export const APIMESSAGE = {
  FETCH_SUCCESS: "取得成功。",
  CREATE_SUCCESS: "追加完了。",
  UPDATE_SUCCESS: "更新完了。",
  DELETE_SUCCESS: "削除完了。",
  LOGIN_SUCCESS: "ログインが成功しました。",
  LOGOUT_SUCCESS: "ログアウトしました。",
};

### models/

#### 型定義

フロントエンド・バックエンド両方で使用する共通の型定義

例:
export type User = {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
};

#### Zodスキーマ

**フロントエンド用スキーマ:**
- UI入力を前提とした最低限のバリデーション
- 基本的に文字列型
- 必須チェック、文字数制限など

例:
export const UserSchemaFront = z.object({
  email: z.string().email('メールアドレスの形式が正しくありません'),
  name: z.string().min(1, '名前は必須です').max(50, '名前は50文字以内です'),
});

**バックエンド用スキーマ:**
- DB型に合わせた型変換
- より厳密なバリデーション
- FK違反、重複制約違反などのDB単位のエラーはServiceレイヤーで処理

例:
export const UserSchemaBack = z.object({
  email: z.string().email().transform(v => v.toLowerCase()),
  name: z.string().min(1).max(50),
  age: z.string().transform(v => parseInt(v, 10)),
});

### routes/

APIエンドポイントのURL定義

例:
export const API_ROUTES = {
  USERS: '/api/users',
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
};

## 使い方

### フロントエンド

import { UserSchemaFront } from '@shared/models/user';
import { API_ROUTES } from '@shared/routes';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { User } from '@shared/models/user';

const result = UserSchemaFront.parse(formData);
fetch(API_ROUTES.USERS, { ... });
toast.success(APIMESSAGE.CREATE_SUCCESS);

### バックエンド

import { UserSchemaBack } from '@shared/models/user';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import { API_ROUTES } from '@shared/routes';

const validatedData = UserSchemaBack.parse(req.body);
res.json({
  message: APIMESSAGE.CREATE_SUCCESS,
  data: user
});

## バリデーション戦略

### フロントエンド
- 目的: ユーザー体験の向上（即座にエラー表示）
- 範囲: UI入力の基本的なチェック
- 例: 必須チェック、文字数制限、形式チェック

### バックエンド
- 目的: データ整合性の保証
- 範囲: DB型への変換、厳密なバリデーション
- 例: 型変換（文字列→数値）、正規化（小文字変換）
- DB制約エラー: FK違反、重複制約違反などはServiceレイヤーで処理

## 単体テスト戦略

### テストパターン

すべての単体テストは AAAパターン（Arrange, Act, Assert）に従って記述

### 単体テスト対象

| 対象 | 理由 |
|------|------|
| フロントエンド用Zodスキーマ | UI入力バリデーションの動作保証 |

### 単体テスト対象外

| 対象 | 対象外とする理由 |
|------|-----------------|
| バックエンド用Zodスキーマ | 型変換のみで、Zodライブラリ側でテスト済み |
| 型定義 | TypeScriptのコンパイラがチェック |
| constants | 定数定義のみ |
| routes | URL文字列の定義のみ |

## 開発ガイドライン

### 新しいモデルを追加する場合

1. models/ に型定義とスキーマを作成
2. フロント用・バック用のスキーマを分けて定義
3. フロント用スキーマの単体テストを作成
4. 必要に応じて constants/apiMessage.ts にメッセージを追加
5. 必要に応じて routes/ にエンドポイントを追加

### 注意事項

- フロント・バック両方で使う型は必ず shared/models/ に定義
- スキーマ変更時は、フロント・バック両方への影響を確認
