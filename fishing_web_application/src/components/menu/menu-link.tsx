"use client";

import React, { FC } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import MENU_ITEMS from "./menu-link-helper";
import { useSession } from "next-auth/react";

interface MenuProps {
  mobileMenuHandler: any
}

const MenuLink: FC<MenuProps> = ({mobileMenuHandler}) => {
  const { data: session } = useSession();

  const onClickHandler = () => {
    mobileMenuHandler()
  }
  return (
    <NavigationMenu className="text-sm block max-w-full">
      <NavigationMenuList className="block space-x-0 min-w-full ">
        {MENU_ITEMS.map((item) => {
          if (session?.user.role === String(item.role)) {
            return(
                <NavigationMenuItem
              key={item.title + " item"}
              className="block text-gray-500 rounded-lg dark:text-white dark:hover:bg-gray-700 min-w-full hover:bg-blue-100 hover:text-blue-600 mb-4"
              onClick={onClickHandler}
            >
              <Link
                href={item.href}
                key={item.title + " link"}
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  key={item.title + " menulink"}
                  className="flex items-center"
                >
                  {item.icon}
                  <p className="md:hidden lg:block">{item.title}</p>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            )
          }
          return "";
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default MenuLink;
