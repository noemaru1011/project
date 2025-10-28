import type { Option } from "@/types/ui";
import { ROUTES } from "@/domain/routes";
import Menu from "./Menu";
import { useState } from "react";

const HeaderOptions: Option[] = [
  { value: ROUTES.HOME, label: "メインページへ" },
  { value: ROUTES.State.INDEX, label: "事故一覧" },
  { value: "", label: "ログアウト" },
];

const Header = () => {
  const main = HeaderOptions[0];
  const navOptions = HeaderOptions.slice(1);
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="px-5 py-4 flex flex-col sm:flex-row sm:justify-between items-center">
        <a href={main.value} className="font-bold mb-2 sm:mb-0">
          {main.label}
        </a>

        <div className="flex flex-col sm:flex-row items-center">
          <nav className="flex flex-col sm:flex-row">
            {navOptions.map((opt, index) => (
              <a
                key={opt.value}
                href={opt.value}
                className={`font-bold mb-2 sm:mb-0 ${
                  index < navOptions.length - 1 ? "sm:mr-5" : ""
                }`}
              >
                {opt.label}
              </a>
            ))}
          </nav>

          {/* ハンバーガーメニューは常に表示 */}
          <div className="ml-5 mt-2 sm:mt-0">
            <Menu open={open} onClick={() => setOpen(!open)} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
