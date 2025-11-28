import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { ROUTES } from '@/constants/routes';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const NotFound = () => {
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
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-purple-50 via-white to-purple-100 px-4 overflow-hidden">
      {/* 背景のぼやけた紫丸 */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-br from-purple-300 via-purple-200 to-purple-100 rounded-full opacity-30 blur-3xl top-1/4 left-1/4"
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
        className="absolute w-80 h-80 bg-gradient-to-br from-purple-200 via-purple-100 to-purple-50 rounded-full opacity-20 blur-3xl bottom-1/4 right-1/4"
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
        <div className="bg-purple-100 p-6 rounded-full shadow-lg relative z-10">
          <AlertTriangle className="w-16 h-16 text-purple-600" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* エラーコード */}
      <h1 className="text-7xl font-extrabold text-purple-600 mb-4 relative z-10">404</h1>

      {/* メッセージ */}
      <p className="text-xl text-gray-700 mb-8 max-w-md text-center relative z-10">
        お探しのページが見つかりません。
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
