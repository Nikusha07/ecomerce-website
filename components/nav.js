import { useRouter } from "next/router";
import { useState } from "react";
import { CategoryIcons } from "@/public/icons/CategoryIcons";
import { DashboardIcon } from "@/public/icons/dashboard";
import { EcomerceIcon } from "@/public/icons/ecomerceIcon";
import { OrdersIcon } from "@/public/icons/orders";
import { ProductIcon } from "@/public/icons/product";
import { SettingIcon } from "@/public/icons/setting";

export default function Nav() {
  const router = useRouter();
  const { pathname } = router;
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (path) => {
    setActiveLink(path);
    router.push(path);
  };

  const NavLink = ({ path, text, Icon }) => (
    <div
      className={`flex items-center gap-2 text-white cursor-pointer p-2 rounded-lg ${
        pathname === path ||
        (pathname.startsWith("/products") && path === "/product")
          ? "bg-red-400 text-blue-600"
          : ""
      }`}
      onClick={() => handleLinkClick(path)}
    >
      <Icon />
      {text}
    </div>
  );

  return (
    <div className="flex flex-col items-center h-full p-4 bg-gray-900">
      <NavLink path="/ecomerce" text="Ecommerce" Icon={EcomerceIcon} />
      <div className="flex flex-col gap-1 mt-4">
        <NavLink path="/" text="Dashboard" Icon={DashboardIcon} />
        <NavLink path="/orders" text="Orders" Icon={OrdersIcon} />
        <NavLink path="/product" text="Products" Icon={ProductIcon} />
        <NavLink path="/settings" text="Settings" Icon={SettingIcon} />
        <NavLink path="/categories" text="Categories" Icon={CategoryIcons} />
      </div>
    </div>
  );
}
