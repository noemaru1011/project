import menuIcon from "@/assets/menu.svg";
import colseIcon from "@/assets/close.svg";
import type { Option } from "@/types/ui";
import { ROUTES } from "@/constants/routes";

const MenuOptions: Option[] = [
  { value: ROUTES.Category.INDEX, label: "大分類マスタ" },
  { value: ROUTES.SubCategory.INDEX, label: "中分類マスタ" },
  { value: ROUTES.MinorCategory.INDEX, label: "小分類マスタ" },
  { value: ROUTES.Department.INDEX, label: "学科マスタ" },
  { value: ROUTES.Status.INDEX, label: "状態区分" },
  { value: ROUTES.Student.INDEX, label: "学生マスタ" },
];

type MenuProps = {
  open: boolean;
  onClick: () => void;
};

const Menu = ({ open, onClick }: MenuProps) => {
  return (
    <div className="relative">
      {/* ハンバーガーアイコン */}
      <img
        src={menuIcon}
        alt="メニュー"
        onClick={onClick}
        className="cursor-pointer w-6 h-6"
      />

      {/* メニュー表示中 */}
      {open && (
        <>
          {/* オーバーレイ（背景クリックで閉じる） */}
          <div
            className="fixed inset-0 backdrop-blur-sm"
            onClick={onClick}
          ></div>

          {/* スライドインメニュー */}
          <div className="fixed top-0 right-0 h-full w-64 bg-white z-50">
            {/* 閉じるボタン（または再利用のアイコン） */}
            <div className="flex justify-end p-4">
              <img
                src={colseIcon}
                alt="閉じる"
                onClick={onClick}
                className="cursor-pointer w-6 h-6"
              />
            </div>

            <nav className="flex flex-col space-y-3 px-4">
              {MenuOptions.map((opt) => (
                <a
                  key={opt.value}
                  href={opt.value}
                  className="font-bold border-b border-gray-300 py-2 hover:text-indigo-500"
                  onClick={onClick}
                >
                  {opt.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
