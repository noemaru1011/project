import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { ROUTES } from '@/constants/routes';
import { ServerCrash } from 'lucide-react';
import { motion } from 'framer-motion';

export const ServerError = () => {
  const navigate = useNavigate();

  const floatAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4 overflow-hidden">
      {/* 背景のぼやけたオレンジ丸 */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-br from-orange-300 via-orange-200 to-orange-100 rounded-full opacity-30 blur-3xl top-1/4 left-1/4"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-br from-orange-200 via-orange-100 to-orange-50 rounded-full opacity-20 blur-3xl bottom-1/4 right-1/4"
        animate={{
          x: [0, -40, 0],
          y: [0, 20, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      {/* アイコン */}
      <motion.div animate={floatAnimation} className="mb-6 relative z-10">
        <div className="bg-orange-100 p-6 rounded-full shadow-lg relative z-10">
          <ServerCrash className="w-16 h-16 text-orange-500" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* エラーコード */}
      <h1 className="text-7xl font-extrabold text-orange-600 mb-4 relative z-10">500</h1>

      {/* メッセージ */}
      <p className="text-xl text-gray-700 mb-8 max-w-md text-center relative z-10">
        サーバーエラーが発生しました。
      </p>

      {/* ボタン */}
      <div className="relative z-10">
        <Button
          type="button"
          variant="Home"
          onClick={() => navigate(ROUTES.HOME)}
          className="w-36 py-3 text-lg"
        />
      </div>
    </div>
  );
};
