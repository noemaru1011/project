import type { Option } from "@/types/ui";
import { ROUTES } from "@/constants/routes";
import { API_ROUTES } from "@/constants/apiRoutes";
import Menu from "./Menu";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const HeaderOptions: Option[] = [
  { value: ROUTES.HOME, label: "メインページへ" },
  { value: ROUTES.History.INDEX, label: "事故一覧" },
  { value: ROUTES.Student.CHANGE, label: "パスワード変更" },
  { value: `${API_BASE_URL}${API_ROUTES.AUTH.LOGOUT}`, label: "ログアウト" },
];

const Header = () => {
  const main = HeaderOptions[0];
  const navOptions = HeaderOptions.slice(1);
  const [open, setOpen] = useState(false);

  // ✅ React で fetch して POST する logout 関数
  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}${API_ROUTES.AUTH.LOGOUT}`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        alert("ログアウトに失敗しました");
        return;
      }

      // ✅ 成功したらログインへ戻す
      window.location.href = ROUTES.Auth.LOGIN;
    } catch (err) {
      alert("ログアウトに失敗しました");
    }
  };

  return (
    <header className="border-b">
      <div className="px-5 py-4 flex flex-col sm:flex-row sm:justify-between items-center">
        <a href={main.value} className="font-bold mb-2 sm:mb-0">
          {main.label}
        </a>

        <div className="flex flex-col sm:flex-row items-center">
          <nav className="flex flex-col sm:flex-row">
            {navOptions.map((opt, index) => {
              // ✅ ログアウトだけ React の fetch を使う
              if (opt.label === "ログアウト") {
                return (
                  <a
                    key={opt.value}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                    className={`font-bold mb-2 sm:mb-0 ${
                      index < navOptions.length - 1 ? "sm:mr-5" : ""
                    }`}
                  >
                    {opt.label}
                  </a>
                );
              }

              return (
                <a
                  key={opt.value}
                  href={opt.value}
                  className={`font-bold mb-2 sm:mb-0 ${
                    index < navOptions.length - 1 ? "sm:mr-5" : ""
                  }`}
                >
                  {opt.label}
                </a>
              );
            })}
          </nav>

          <div className="ml-5 mt-2 sm:mt-0">
            <Menu open={open} onClick={() => setOpen(!open)} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
