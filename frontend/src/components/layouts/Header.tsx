import type { Option } from "@/types/ui";
import { ROUTES } from "@/constants/routes";
import Menu from "./Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/useLogout";

const HeaderOptions: Option[] = [
  { value: ROUTES.HOME, label: "メインページへ" },
  { value: ROUTES.History.INDEX, label: "事故一覧" },
  { value: ROUTES.Student.CHANGE, label: "パスワード変更" },
  { value: "LOGOUT", label: "ログアウト" },
];

const Header = () => {
  const navigate = useNavigate();
  const { logout, loading } = useLogout();
  const main = HeaderOptions[0];
  const navOptions = HeaderOptions.slice(1);
  const [open, setOpen] = useState(false);

  const handleNavigate = async (opt: Option) => {
    if (opt.value === "LOGOUT") {
      try {
        await logout();
        navigate(ROUTES.Auth.LOGIN, { replace: true });
      } catch {
        // 既に toast は useLogout 内で出している
      }
      return;
    }

    navigate(opt.value);
  };

  return (
    <header className="border-b">
      <div className="px-5 py-4 flex flex-col sm:flex-row sm:justify-between items-center">
        <button
          onClick={() => handleNavigate(main)}
          className="font-bold mb-2 sm:mb-0"
        >
          {main.label}
        </button>

        <div className="flex flex-col sm:flex-row items-center">
          <nav className="flex flex-col sm:flex-row">
            {navOptions.map((opt, index) => (
              <button
                key={opt.value}
                onClick={() => handleNavigate(opt)}
                className={`font-bold mb-2 sm:mb-0 ${
                  index < navOptions.length - 1 ? "sm:mr-5" : ""
                }`}
                disabled={loading && opt.value === "LOGOUT"}
              >
                {opt.label}
              </button>
            ))}
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
