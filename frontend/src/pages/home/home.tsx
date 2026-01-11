import { PlusCircle, ListCheck } from 'lucide-react';
import organization from '@/assets/organization.svg';

export const HomePage = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left">
          学生履歴管理システムの概要
        </h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {/* 履歴作成画面 */}
          <section
            role="region"
            aria-labelledby="history-create-title"
            aria-describedby="history-create-desc"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col gap-4"
          >
            {/* 見出し領域 */}
            <header className="flex items-center gap-3 text-indigo-600">
              <PlusCircle className="w-6 h-6" aria-hidden="true" />
              <h2 id="history-create-title" className="text-xl font-semibold text-gray-800">
                履歴作成画面
              </h2>
            </header>

            {/* 説明 */}
            <p id="history-create-desc" className="text-gray-600 leading-relaxed">
              この画面では、学生の状況を時間帯付きで登録できます。
              以下の手順に従って入力してください。
            </p>

            {/* 手順 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">入力手順</h3>

              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>
                  例：
                  <time dateTime="2026-01-01T09:00">2026/01/01 09:00</time>
                  から
                  <time dateTime="2026-01-01T18:00">同日 18:00</time>
                  まで体調不良で休務する場合を想定します。
                </li>

                <li>
                  該当する学生を検索し、
                  <span className="font-semibold">チェックを入れます</span>。
                </li>

                <li>
                  「状況」から
                  <span className="font-semibold text-indigo-600" aria-label="状態：休務">
                    休務
                  </span>
                  を選択します。
                </li>

                <li>
                  「有効開始」に
                  <time dateTime="2026-01-01T09:00">2026/01/01 09:00</time>
                  を入力します。
                </li>

                <li>
                  「有効終了」に
                  <time dateTime="2026-01-01T18:00">2026/01/01 18:00</time>
                  を入力します。
                </li>

                <li>
                  必要に応じて「備考」に
                  <span className="italic">於：○○号室</span>
                  などを記入します。
                </li>
                <li>
                  <span className="font-semibold">
                    ※有効時間の重複したデータには注意してください。
                  </span>
                </li>
              </ol>

              <div className="flex justify-end">
                <span className="text-sm text-gray-400 italic">※入力内容は後から編集できます</span>
              </div>
            </div>
          </section>

          {/* 履歴一覧画面 */}
          <section
            role="region"
            aria-labelledby="history-list-title"
            aria-describedby="history-list-desc"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col gap-4"
          >
            {/* 見出し領域 */}
            <header className="flex items-center gap-3 text-indigo-600">
              <ListCheck className="w-6 h-6" aria-hidden="true" />
              <h2 id="history-list-title" className="text-xl font-semibold text-gray-800">
                履歴一覧画面
              </h2>
            </header>

            {/* 説明 */}
            <p id="history-list-desc" className="text-gray-600 leading-relaxed">
              この画面では、学生の履歴と時間毎の状況を検索、一覧が表示されます。また履歴の更新・削除の操作が可能です。
            </p>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">補足事項</h3>

              <ul className="list-decimal list-inside space-y-2 text-gray-700">
                <li>更新画面の有効フラグは、チェックを外すと、時間毎の集計には反映されません。</li>
                <li>有効終了日を未定で登録した場合は、終了日がわかり次第、更新してください</li>
                <li>削除画面で、削除をした際は、その履歴がなかったことになります。</li>
              </ul>
            </div>
          </section>
        </div>
        <figure className="mt-8">
          <img
            src={organization}
            alt="この学校（1大隊）の組織構成を示した図"
            className="w-full rounded-lg border border-gray-200"
          />

          <figcaption className="mt-3 text-sm text-gray-600 leading-relaxed">
            これは、この学校の1大隊の組織図です。 会社の「部署(大隊) → 課(中隊)
            →所(小隊)」の関係をイメージしてください。
            学生の所属の最小単位は小隊です。また、学年と所属学科の括りもあります。1大隊11中隊111小隊の4年生工学部○○さんという形です
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
