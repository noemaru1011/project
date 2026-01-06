import path from 'path';
import fs from 'fs';

const LOG_DIR = path.join(process.cwd(), 'logs');

// サーバー側で許可するログファイルを固定
const ALLOWED_LOG_FILES = ['access.log', 'error.log'];

export const getLogFiles = () => {
  const files = ALLOWED_LOG_FILES.map((file) => {
    const fullPath = path.join(LOG_DIR, file);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`${file} が存在しません`);
    }

    return {
      filename: file,
      path: fullPath,
    };
  });

  return files;
};
