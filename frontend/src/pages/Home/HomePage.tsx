import { PlusCircle, ListCheck } from 'lucide-react';

export const HomePage = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left">
          学生履歴管理システムの概要
        </h2>

        <div className="grid gap-8 sm:grid-cols-2">
          {/* 履歴作成画面 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 text-indigo-600">
              <PlusCircle className="w-6 h-6" />
              <h3 className="text-xl font-semibold text-gray-800">履歴作成画面</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              学生の状況を登録できます。新しい履歴を追加すると、学生の最新状況として反映されます。
            </p>
          </div>

          {/* 履歴一覧画面 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 text-green-600">
              <ListCheck className="w-6 h-6" />
              <h3 className="text-xl font-semibold text-gray-800">履歴一覧画面</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-2">学生の現在の状況を確認できます。</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>重複した状況(Status)は、期限の長い方が優先されます。</li>
              <li>削除は完全に削除され、履歴一覧からも消えます。</li>
              <li>無効は一時的に無効となり、カウントされません。</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
