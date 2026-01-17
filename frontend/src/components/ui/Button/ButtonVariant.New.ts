export const VARIANT_STYLES = {
  Primary: {
    class:
      'bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors',
  },
  Secondary: {
    class:
      'bg-white hover:bg-blue-50 text-blue-700 border border-blue-600 shadow-sm transition-colors',
  },
  Neutral: {
    class:
      'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 shadow-sm transition-colors',
  },
  Danger: {
    class:
      'bg-red-600 hover:bg-red-700 text-white shadow-md transition-colors',
  },
  Retry: {
    class:
      'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 shadow-sm transition-colors',
  },
} as const;

export type ButtonVariant = keyof typeof VARIANT_STYLES;
