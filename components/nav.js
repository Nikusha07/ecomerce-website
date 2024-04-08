import { DashboardIcon } from "@/public/icons/dashboard";
import { EcomerceIcon } from "@/public/icons/ecomerceIcon";
import { OrdersIcon } from "@/public/icons/orders";
import { ProductIcon } from "@/public/icons/product";
import { SettingIcon } from "@/public/icons/setting";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Nav() {
  const router = useRouter();
  const { pathname } = router;
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (path) => {
    setActiveLink(path);
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-between h-full gap-5 p-4 bg-gray-900">
      <div
        className={`flex items-center gap-2 text-white cursor-pointer ${
          pathname === "/ecomerce" ? "bg-white text-blue-500 rounded-lg" : ""
        }`}
        onClick={() => handleLinkClick("/ecomerce")}
      >
        <EcomerceIcon/>
        ecomerce
      </div>
      <div className="flex flex-col gap-5">
        <div
          className={`flex items-center gap-2 text-white cursor-pointer ${
            pathname === "/" ? "bg-white text-blue-500 rounded-lg" : ""
          }`}
          onClick={() => handleLinkClick("/")}
        >
          <DashboardIcon />
          dashboard
        </div>
        <div
          className={`flex items-center gap-2 text-white cursor-pointer ${
            pathname === "/orders" ? "bg-white text-blue-500 rounded-lg" : ""
          }`}
          onClick={() => handleLinkClick("/orders")}
        >
          <OrdersIcon />
          orders
        </div>
        <div
          className={`flex items-center gap-2 text-white cursor-pointer ${
            pathname === "/product" ? "bg-white text-blue-500 rounded-lg" : ""
          }`}
          onClick={() => handleLinkClick("/product")}
        >
          <ProductIcon />
          products
        </div>
        <div
          className={`flex items-center gap-2 text-white cursor-pointer ${
            pathname === "/settings" ? "bg-white text-blue-500 rounded-lg" : ""
          }`}
          onClick={() => handleLinkClick("/settings")}
        >
          <SettingIcon />
          settings
        </div>
      </div>
    </div>
  );
}