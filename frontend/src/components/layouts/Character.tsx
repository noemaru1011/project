import { useRef } from 'react';
import { motion } from 'framer-motion';

type MascotProps = {
  isPasswordFocus: boolean;
};

// 色定義
const colors = {
  body: 'bg-[#C18C5D]', // 茶色
  bodyDark: 'bg-[#A06E45]', // 茶色(影・手)
  mane: 'bg-[#FDD06F]', // たてがみ
  snout: 'bg-[#FDF6E9]', // 口元
  earInner: 'bg-[#5D4037]', // 耳の中
  eye: 'bg-[#3E3E3E]', // 目
  nostril: 'bg-[#3E3E3E]', // 鼻の穴
};

export const Mascot = ({ isPasswordFocus }: MascotProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-48 h-52 flex justify-center items-center mt-8" ref={containerRef}>
      {/* --- 左耳 (修正: 細長くシャープに) --- */}
      {/* rounded-tr(右上)を大きく、tl(左上)を小さくして、先端を尖らせつつ内側を直線的に */}
      <div
        className={`absolute -top-6 left-6 w-9 h-24 ${colors.body} rotate-[-15deg] z-0 origin-bottom
        rounded-tr-[100%] rounded-tl-[10%] rounded-b-xl border-2 border-black/5`}
      >
        <div
          className={`absolute top-4 left-1.5 w-5 h-14 ${colors.earInner} opacity-60
          rounded-tr-[100%] rounded-tl-[10%] rounded-b-lg`}
        />
      </div>

      {/* --- 右耳 (修正: 細長くシャープに) --- */}
      {/* 左耳と対称の形状 */}
      <div
        className={`absolute -top-6 right-6 w-9 h-24 ${colors.body} rotate-[15deg] z-0 origin-bottom
        rounded-tl-[100%] rounded-tr-[10%] rounded-b-xl border-2 border-black/5`}
      >
        <div
          className={`absolute top-4 right-1.5 w-5 h-14 ${colors.earInner} opacity-60
          rounded-tl-[100%] rounded-tr-[10%] rounded-b-lg`}
        />
      </div>

      {/* --- 顔のベース --- */}
      <div
        className={`relative z-10 w-40 h-48 ${colors.body} rounded-[3.5rem] shadow-xl flex flex-col items-center overflow-hidden`}
      >
        {/* --- たてがみ (修正: 複数のパーツで毛束感を出す) --- */}
        <div className="absolute top-0 w-full h-24 z-20 pointer-events-none">
          {/* メインの毛束（右に流す） */}
          <div
            className={`absolute -top-2 left-1/2 -translate-x-1/2 w-28 h-20 ${colors.mane} 
            rounded-br-[4rem] rounded-bl-[1rem] rounded-t-xl shadow-sm`}
          />

          {/* アクセントの毛束（左側にはねる毛） */}
          <div
            className={`absolute top-0 left-6 w-10 h-16 ${colors.mane} 
            rounded-tl-[2rem] rounded-br-[1rem] rotate-[-10deg]`}
          />

          {/* 前髪の先端（少し尖らせる） */}
          <div
            className={`absolute top-10 left-1/2 w-12 h-12 ${colors.mane} 
            rounded-br-full rotate-45`}
          />
        </div>

        {/* --- 目エリア --- */}
        <div className="absolute top-24 w-full flex justify-between px-8 z-20">
          <motion.div
            className={`w-4 h-4 ${colors.eye} rounded-full`}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />

          <motion.div
            className={`w-4 h-4 ${colors.eye} rounded-full`}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        </div>

        {/* --- 手（ひづめ） --- */}
        <motion.div
          className={`absolute left-6 w-12 h-20 ${colors.bodyDark} rounded-t-full z-30 border-2 border-black/5`}
          initial={{ y: 150 }}
          animate={{ y: isPasswordFocus ? 60 : 180 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        />
        <motion.div
          className={`absolute right-6 w-12 h-20 ${colors.bodyDark} rounded-t-full z-30 border-2 border-black/5`}
          initial={{ y: 150 }}
          animate={{ y: isPasswordFocus ? 60 : 180 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.05 }}
        />

        {/* --- 口元 --- */}
        <div
          className={`absolute bottom-0 w-full h-20 ${colors.snout} rounded-b-[3.5rem] rounded-t-[40%] flex justify-center items-center z-10`}
        >
          <div className="flex gap-10 mt-3">
            <div className={`w-3 h-4 ${colors.nostril} rounded-full opacity-80 rotate-[-10deg]`} />
            <div className={`w-3 h-4 ${colors.nostril} rounded-full opacity-80 rotate-[10deg]`} />
          </div>
        </div>
      </div>
    </div>
  );
};
