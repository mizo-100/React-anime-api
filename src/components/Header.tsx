import { Menu, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { NavItems } from "./const/NavItems";
import { useHeader } from "./hooks/useHeader";

export const Header = () => {

  const {
    isOpen,
    isModalOpen,
    isHidden,
    handleNavigate,
    toggleMenu,
    toggleModal,
    closeMenu,
  } = useHeader();

  if (isHidden) {
    return null;
  }

  return (
    <header className="w-full bg-white shadow-sm relative">
      <div className="max-w-325 mx-auto px-4 md:px-20 py-4 flex justify-between items-center">

       <div className="flex items-center gap-x-10 hover:opacity-80 transition-opacity">
        <Link to="/index" >
          <img
            src="/HaderRogo.jpg"
            alt="Logo"
            className="w-12 h-12 rounded-full object-cover"
          />
        </Link>
        <span className="text-xl font-bold text-gray-800">
          こんにちはuserさん
        </span>
       </div>

        <div className="hidden md:flex items-center gap-x-8 ml-auto">
          <nav className="flex gap-x-6 text-sm text-gray-600">
            {NavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="hover:text-green-400 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="relative">
            <button
              onClick={toggleModal}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-green-400 transition-colors"
            >
              <User size={20} />
            </button>

            {isModalOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={() => handleNavigate("/mypage")}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  マイページ情報
                </button>
                <button
                  onClick={() => handleNavigate("/")}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-green-100"
                >
                  ログアウト
                </button>
              </div>
            )}
          </div>
        </div>

        <button onClick={toggleMenu} className="md:hidden text-gray-800 p-2">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div className="border-t border-gray-200"></div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-b border-gray-200 py-6 px-6 flex flex-col space-y-4 md:hidden z-50">
          <nav className="flex flex-col space-y-3 text-sm text-gray-700">
            {NavItems.map((item) => (
              <Link key={item.href} to={item.href} onClick={closeMenu} className="hover:text-green-400">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 pt-3 flex flex-col space-y-2 text-sm">
            <button onClick={() => handleNavigate("/mypage")} className="text-left text-gray-700 py-1">
              マイページ情報
            </button>
            <button onClick={() => handleNavigate("/")} className="text-left text-red-600 py-1">
              ログアウト
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
