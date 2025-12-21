import { Button } from '@/components/ui/Button/Button';
import { motion } from 'framer-motion';

type Props = {
  code: string;
  message: string;
  icon: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  bgFrom?: string;
  bgVia?: string;
  bgTo?: string;
};

export const ErrorLayout = ({
  code,
  message,
  icon,
  onButtonClick,
  bgFrom = 'orange-50',
  bgVia = 'white',
  bgTo = 'orange-100',
}: Props) => {
  const floatAnimation = {
    y: [0, -15, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-${bgFrom} via-${bgVia} to-${bgTo} px-4 overflow-hidden`}
    >
      {/* 背景丸 */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl top-1/4 left-1/4"
        style={{ background: `radial-gradient(circle, ${bgFrom}, ${bgVia}, ${bgTo})` }}
        animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl bottom-1/4 right-1/4"
        style={{ background: `radial-gradient(circle, ${bgFrom}, ${bgVia}, ${bgTo})` }}
        animate={{ x: [0, -40, 0], y: [0, 20, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* アイコン */}
      <motion.div animate={floatAnimation} className="mb-6 relative z-10">
        <div className="p-6 rounded-full shadow-lg relative z-10 bg-white">{icon}</div>
      </motion.div>

      {/* エラーコード */}
      <h1 className="text-7xl font-extrabold text-center mb-4 relative z-10">{code}</h1>

      {/* メッセージ */}
      <p className="text-xl text-gray-700 mb-8 max-w-md text-center relative z-10">{message}</p>

      {/* ボタン */}
      {onButtonClick && (
        <div className="relative z-10">
          <Button
            type="button"
            variant="Home"
            onClick={onButtonClick}
            className="w-36 py-3 text-lg"
          />
        </div>
      )}
    </div>
  );
};
