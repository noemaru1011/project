//読み込み中の状態を処理するための共通コンポーネント;
type Props = {
  loading?: boolean;
  children?: React.ReactNode;
};

export const Loading = ({ loading, children }: Props) => {
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );

  return <>{children}</>;
};
