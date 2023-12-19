import {
  BarChartBig,
  BookMarked,
  Home,
  LayoutGrid,
  MapPinned,
  Newspaper,
  Trophy,
  Users,
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

  {
    title: "Bejegyzések",
    href: "/post",
    role: "USER",
    icon: < Newspaper className="m-2" />,
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },

  {
    title: "Statisztika",
    href: "/statistics",
    role: "USER",
    icon: < BarChartBig className="m-2" />,
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },

  {
    title: "Statisztika",
    href: "/statistics",
    role: "ADMIN",
    icon: <BarChartBig className="m-2" />,
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },

  {
    title: "Bejegyzések",
    href: "/post",
    role: "ADMIN",
    icon: <Newspaper className="m-2" />,
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Versenyek",
    href: "/tournament",
    role: "USER",
    icon: < Trophy className="m-2" />,
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },

  {
    title: "Versenyek",
    href: "/tournament",
    role: "ADMIN",
    icon: <Trophy className="m-2" />,
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Térkép",
    href: "/map",
    role: "USER",
    icon: < MapPinned className="m-2" />,
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },

  {
    title: "Térkép",
    href: "/map",
    role: "ADMIN",
    icon: <MapPinned className="m-2" />,
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },

  {
    title: "Felhasználók",
    href: "/users",
    role: "ADMIN",
    icon: <Users className="m-2" />,
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
];

export default MENU_ITEMS;
