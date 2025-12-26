import { Button } from '@/components/ui/Button/Button';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldAlert, ServerCrash } from 'lucide-react';

export interface Props {
  type?: '404' | '403' | '500';
  title?: string;
  message?: string;
  onGoHome?: () => void;
  onGoBack?: () => void;
  onRetry?: () => void;
}

const errorConfig = {
  '404': {
    code: '404',
    defaultTitle: 'お探しのページが見つかりません。',
    defaultMessage:
      'お探しのページは見つかりませんでした。URLが正しいか確認するか、ホームページに戻ってください。',
    icon: AlertTriangle,
    gradient: 'from-pink-500 via-purple-500 to-indigo-500',
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  '403': {
    code: '403',
    defaultTitle: 'アクセス権限がありません。',
    defaultMessage:
      'アクセス権限がありません。このエラーが発生する場合は、管理者に連絡してください。',
    icon: ShieldAlert,
    gradient: 'from-red-500 via-orange-500 to-yellow-500',
    iconColor: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  '500': {
    code: '500',
    defaultTitle: 'サーバーエラーが発生しました。',
    defaultMessage: 'サーバーで問題が発生しました。時間をおいて再度お試しください。',
    icon: ServerCrash,
    gradient: 'from-orange-500 via-red-500 to-pink-500',
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
};

export const ErrorLayout = ({
  type = '404',
  title,
  message,
  onGoHome,
  onGoBack,
  onRetry,
}: Props) => {
  const config = errorConfig[type];
  const Icon = config.icon;

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br ${config.gradient} opacity-10 rounded-full blur-3xl`}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br ${config.gradient} opacity-10 rounded-full blur-3xl`}
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Error Icon */}
          <motion.div className="flex justify-center mb-8" animate={floatingAnimation}>
            <div className={`relative ${config.bgColor} p-8 rounded-full`}>
              <motion.div
                animate={pulseAnimation}
                className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-20 rounded-full blur-xl`}
              />
              <Icon className={`w-24 h-24 ${config.iconColor} relative z-10`} strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Error Code */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-6"
          >
            <h1
              className={`text-9xl bg-gradient-to-br ${config.gradient} bg-clip-text text-transparent`}
              style={{ fontWeight: 900 }}
            >
              {config.code}
            </h1>
          </motion.div>

          {/* Title and Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-slate-800 mb-3 text-2xl font-bold">
              {title || config.defaultTitle}
            </h2>
            <p className="text-slate-600 max-w-md mx-auto">{message || config.defaultMessage}</p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {onGoBack && (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="LastPage"
                  onClick={onGoBack}
                  className="px-6 py-3 rounded-xl"
                />
              </div>
            )}

            {onGoHome && (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="Home"
                  onClick={onGoHome}
                  className="px-6 py-3 rounded-xl"
                />
              </div>
            )}

            {onRetry && (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="Retry"
                  onClick={onRetry}
                  className="px-6 py-3 rounded-xl"
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
