import {
  BarChartBig,
  BookMarked,
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
    title: "Hírek",
    href: "/News",
    role: "USER",
    icon: <Newspaper className="m-2" />,
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Statisztika",
    href: "/statistics",
    role: "USER",
    icon: <BarChartBig className="m-2" />,
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Versenyek",
    href: "/tournaments",
    role: "USER",
    icon: <Trophy className="m-2" />,
    description: "Visually or semantically separates content.",
  },
  {
    title: "Térkép",
    href: "/map",
    role: "USER",
    icon: <MapPinned className="m-2" />,
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "tooltip",
    href: "/docs/primitives/tooltip",
    role: "ADMIN",
    icon: <LayoutGrid className="m-2" />,
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default MENU_ITEMS;
