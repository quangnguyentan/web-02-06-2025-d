import { NavItem, SportCategory } from "@/types/index";
import {
  UserIcon,
  BadmintonIcon,
  BasketballIcon,
  OtherSportsIcon,
  EventsIcon,
  FootballIcon,
  TennisIcon,
  VolleyballIcon,
  EsportsIcon,
  RacingIcon,
  MartialArtsIcon,
  BilliardsIcon,
  TVIcon,
} from "../layout/Icon";
import * as React from "react";
import { useNavigate } from "react-router-dom";

// MainNavbar nhận prop onOpenMenu để mở drawer trên mobile
const MainNavbar: React.FC<{ onOpenMenu: () => void }> = ({ onOpenMenu }) => {
  const navItems: NavItem[] = [
    { label: "TRANG CHỦ", url: "/" },
    { label: "LỊCH THI ĐẤU", url: "/lich-thi-dau" },
    { label: "KẾT QUẢ", url: "/ket-qua" },
    { label: "XEM LẠI", url: "/xem-lai" },
    { label: "XOILAC.TV", url: "/xoi-lac-tv" },
  ];
  const navigate = useNavigate();
  return (
    <div className="bg-[#1E2027] text-gray-300 flex items-center justify-between p-2 sm:p-3 px-3 sm:px-6 xl:mx-4">
      <img
        src="https://via.placeholder.com/120x32/FFFFFF/1A202C?text=THAPCAM"
        alt="ThapCam TV Logo"
        className="h-8 sm:h-10 mr-2 md:mr-6"
      />
      <div>
        <nav className="hidden md:flex items-center">
          {navItems.map((item) => (
            <div
              key={item.label}
              onClick={() => navigate(item.url)}
              className="px-1.5 sm:px-2 lg:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs lg:text-sm hover:text-white hover:bg-slate-700 rounded transition-colors whitespace-nowrap font-medium cursor-pointer"
            >
              {item.label}
            </div>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-1.5 sm:space-x-3">
        <button className="hidden sm:flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm">
          <TVIcon className="w-5 h-5 mr-1" />
          ThapCam TV
        </button>
        <button className="hidden sm:flex items-center bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-3 py-2 rounded text-sm">
          Cược Uy Tín
        </button>
        <button className="bg-slate-700 hover:bg-slate-600 p-1.5 sm:p-2 rounded-full">
          <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white"
          onClick={onOpenMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// SportsNavbar: thanh menu thể thao ngang, ẩn trên mobile
const SportsNavbar: React.FC = () => {
  const sportCategories: SportCategory[] = [
    {
      id: "tennis",
      name: "Tennis",
      icon: <TennisIcon className="w-4 h-4" />,
    },
    {
      id: "racing",
      name: "Đua xe",
      icon: <RacingIcon className="w-4 h-4" />,
    },
    {
      id: "esports",
      name: "eSports",
      icon: <EsportsIcon className="w-4 h-4" />,
    },
    {
      id: "basketball",
      name: "Bóng rổ",
      icon: <BasketballIcon className="w-4 h-4" />,
    },
    {
      id: "badminton",
      name: "Cầu lông",
      icon: <BadmintonIcon className="w-4 h-4" />,
    },
    {
      id: "volleyball",
      name: "Bóng chuyền",
      icon: <VolleyballIcon className="w-4 h-4" />,
    },
    {
      id: "other_sports",
      name: "Môn khác",
      icon: <OtherSportsIcon className="w-4 h-4" />,
    },
    {
      id: "football",
      name: "Bóng đá",
      icon: <FootballIcon className="w-4 h-4" />,
    },
    {
      id: "martial_arts",
      name: "Võ thuật",
      icon: <MartialArtsIcon className="w-4 h-4" />,
    },
    {
      id: "events",
      name: "Sự kiện đặc biệt",
      icon: <EventsIcon className="w-4 h-4" />,
    },
    {
      id: "billiards",
      name: "Bi-a",
      icon: <BilliardsIcon className="w-4 h-4" />,
    },
  ];
  // Chỉ hiển thị trên md trở lên
  return (
    <div className="hidden md:flex bg-[#22252D] px-3 sm:px-6 xl:mx-4 py-2 overflow-x-auto shadow-xl">
      {sportCategories.map((category) => (
        <div
          key={category.id}
          className="flex items-center gap-2 px-3 pb-2 pt-4 text-gray-200 text-sm font-medium cursor-pointer hover:text-white relative"
        >
          {category.icon}
          <span>{category.name}</span>
          {(category.name === "Cầu lông" ||
            category.name === "Bóng rổ" ||
            category.name === "Môn khác" ||
            category.name === "Tennis" ||
            category.name === "Đua xe" ||
            category.name === "eSports") && (
            <span className="ml-1 text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-xl absolute right-[-10px] top-[-4px]">
              LIVE
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

// DrawerMenu: menu trượt trái cho mobile
const DrawerMenu: React.FC<{
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  sportCategories: SportCategory[];
  navigate: (url: string) => void;
}> = ({ open, onClose, navItems, sportCategories, navigate }) => (
  <div
    className={`fixed inset-0 z-50 transition-all duration-300 ${
      open ? "visible" : "invisible"
    }`}
  >
    {/* Overlay */}
    <div
      className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    />
    {/* Drawer */}
    <div
      className={`absolute left-0 top-0 h-full w-64 max-w-[80vw] bg-slate-800 shadow-lg transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      } flex flex-col`}
    >
      <button
        className="self-end m-3 p-2 text-gray-400 hover:text-white"
        onClick={onClose}
      >
        <svg
          width={24}
          height={24}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <nav className="flex-1 px-4">
        {navItems.map((item) => (
          <div
            key={item.label}
            onClick={() => {
              navigate(item.url);
              onClose();
            }}
            className="py-2 text-sm font-semibold text-white hover:text-orange-400 cursor-pointer"
            style={{
              color: item.label === "TRANG CHỦ" ? "#ff7f32" : undefined,
            }}
          >
            {item.label}
          </div>
        ))}
        <hr className="my-2 border-slate-700" />
        <div className="flex flex-col gap-1">
          {sportCategories.map((category) => (
            <div
              key={category.id}
              className="flex items-center gap-2 py-1 text-gray-200 text-sm"
            >
              {category.icon}
              <span>{category.name}</span>
              {(category.name === "Cầu lông" ||
                category.name === "Bóng rổ" ||
                category.name === "Môn khác" ||
                category.name === "Tennis" ||
                category.name === "Đua xe" ||
                category.name === "eSports") && (
                <span className="text-[9px] bg-red-500 text-white rounded-[5px] px-[6px]">
                  Live
                </span>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  </div>
);

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navItems: NavItem[] = [
    { label: "TRANG CHỦ", url: "/" },
    { label: "LỊCH THI ĐẤU", url: "/lich-thi-dau" },
    { label: "KẾT QUẢ", url: "/ket-qua" },
    { label: "XEM LẠI", url: "/xem-lai" },
    { label: "XOILAC.TV", url: "/xoi-lac-tv" },
  ];
  const sportCategories: SportCategory[] = [
    {
      id: "tennis",
      name: "Tennis",
      icon: <TennisIcon className="w-4 h-4" />,
    },
    {
      id: "racing",
      name: "Đua xe",
      icon: <RacingIcon className="w-4 h-4" />,
    },
    {
      id: "esports",
      name: "eSports",
      icon: <EsportsIcon className="w-4 h-4" />,
    },
    {
      id: "basketball",
      name: "Bóng rổ",
      icon: <BasketballIcon className="w-4 h-4" />,
    },
    {
      id: "badminton",
      name: "Cầu lông",
      icon: <BadmintonIcon className="w-4 h-4" />,
    },
    {
      id: "volleyball",
      name: "Bóng chuyền",
      icon: <VolleyballIcon className="w-4 h-4" />,
    },
    {
      id: "other_sports",
      name: "Môn khác",
      icon: <OtherSportsIcon className="w-4 h-4" />,
    },
    {
      id: "football",
      name: "Bóng đá",
      icon: <FootballIcon className="w-4 h-4" />,
    },
    {
      id: "martial_arts",
      name: "Võ thuật",
      icon: <MartialArtsIcon className="w-4 h-4" />,
    },
    {
      id: "events",
      name: "Sự kiện đặc biệt",
      icon: <EventsIcon className="w-4 h-4" />,
    },
    {
      id: "billiards",
      name: "Bi-a",
      icon: <BilliardsIcon className="w-4 h-4" />,
    },
  ];
  const navigate = useNavigate();

  return (
    <header className="z-30 shadow-lg container mx-auto max-w-screen-xl">
      <MainNavbar onOpenMenu={() => setDrawerOpen(true)} />
      <SportsNavbar />
      <DrawerMenu
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navItems={navItems}
        sportCategories={sportCategories}
        navigate={navigate}
      />
    </header>
  );
};

export default Header;
