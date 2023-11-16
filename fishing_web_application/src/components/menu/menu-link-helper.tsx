import {
  BarChartBig,
  BookMarked,
  Home,
  LayoutGrid,
  MapPinned,
  Newspaper,
  Trophy,
} from "lucide-react";
import { ReactNode } from "react";

enum Roles {
  USER,
  ADMIN,
}

const MENU_ITEMS: {
  title: string;
  href: string;
  role: string;
  icon: ReactNode;
  description: string;
}[] = [
  {
    title: "Általános",
    href: "/dashboard",
    role: "USER",
    icon: <LayoutGrid className="m-2" />,
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Napló",
    href: "/logBook",
    role: "USER",
    icon: <BookMarked className="m-2" />,
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Általános",
    href: "/dashboard",
    role: "ADMIN",
    icon: <LayoutGrid className="m-2" />,
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Napló",
    href: "/logBook",
    role: "ADMIN",
    icon: <BookMarked className="m-2" />,
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Egyesület",
    href: "/fisheryAuthority",
    role: "ADMIN",
    icon: <Home className="m-2" />,
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
];

export default MENU_ITEMS;
