type Props = {
  loading?: boolean;
  children?: React.ReactNode;
};

export const Loading = ({ loading, children }: Props) => {
  if (loading)
    return (
      <div role="status" aria-label="読み込み中" className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );

  return <>{children}</>;
};
