import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

type MascotProps = {
  isPasswordFocus: boolean;
};

export const Mascot = ({ isPasswordFocus }: MascotProps) => {
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const mascotRef = useRef<HTMLDivElement>(null);

  // マウス追従
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mascotRef.current) return;
      const rect = mascotRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10; // 目の最大移動幅
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      setEyePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={mascotRef} className="w-32 h-32 relative mx-auto my-4">
      {/* 顔 */}
      <div className="w-full h-full bg-yellow-300 rounded-full relative flex items-center justify-center">
        {/* 左目 */}
        <motion.div
          className="w-4 h-4 bg-black rounded-full absolute left-10 top-10"
          animate={{
            x: isPasswordFocus ? 0 : eyePos.x,
            y: isPasswordFocus ? 10 : eyePos.y, // パスワード時は目を隠す
          }}
        />
        {/* 右目 */}
        <motion.div
          className="w-4 h-4 bg-black rounded-full absolute right-10 top-10"
          animate={{
            x: isPasswordFocus ? 0 : eyePos.x,
            y: isPasswordFocus ? 10 : eyePos.y,
          }}
        />
        {/* 口 */}
        <div className="w-8 h-2 bg-black rounded-full absolute bottom-8"></div>
      </div>
    </div>
  );
};
