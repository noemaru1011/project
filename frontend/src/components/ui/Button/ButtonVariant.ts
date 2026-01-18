export const VARIANT_STYLES = {
  Primary: {
    class: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors',
  },
  Secondary: {
    class:
      'bg-white hover:bg-gray-100 text-blue-600 border border-blue-400 shadow-sm transition-colors',
  },
  Neutral: {
    class:
      'bg-gray-200 hover:bg-gray-300 text-gray-900 border border-gray-400 shadow-sm transition-colors',
  },
  Danger: {
    class: 'bg-red-600 hover:bg-red-700 text-white shadow-md transition-colors',
  },
  Retry: {
    class:
      'bg-gray-300/30 hover:bg-gray-400/80 text-black border border-gray-400 shadow-sm transition-colors',
  },
} as const;

export type ButtonVariant = keyof typeof VARIANT_STYLES;
