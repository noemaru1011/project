///Loading用のスピナー
type Props = {
  loading?: boolean;
  children?: React.ReactNode;
  loadingText?: string;
};

export const Loading = ({ loading, children, loadingText = '読み込み中' }: Props) => {
  if (loading)
    return (
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        className="flex justify-center items-center h-64"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid" />
        <span className="sr-only">{loadingText}</span>
      </div>
    );
  return <>{children}</>;
};
