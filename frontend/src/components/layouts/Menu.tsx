import menuIcon from "@/assets/menu.svg";
import colseIcon from "@/assets/close.svg";
import type { Option } from "@/types/ui";
import { ROUTES } from "@/domain/routes";

const MenuOptions: Option[] = [
  { value: ROUTES.CUSTOMER.INDEX, label: "得意先マスタ" },
  { value: ROUTES.CUSTOMER_STAFF.INDEX, label: "得意先担当者マスタ" },
  { value: ROUTES.SUPPLIER.INDEX, label: "仕入先マスタ" },
  { value: ROUTES.SUPPLIER_STAFF.INDEX, label: "仕入先担当者マスタ" },
  { value: ROUTES.PROPERTY.INDEX, label: "物件マスタ" },
  { value: ROUTES.HOUSEMASTER.INDEX, label: "家主マスタ" },
  { value: ROUTES.GOODS_WORKS.INDEX, label: "小分類マスタ" },
  { value: "", label: "ログアウト" },
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
