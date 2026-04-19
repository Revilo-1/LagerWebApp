import {
  Banknote,
  Calendar,
  ChartBar,
  Database,
  Fingerprint,
  Forklift,
  Gauge,
  GraduationCap,
  Kanban,
  LayoutDashboard,
  Lock,
  type LucideIcon,
  Mail,
  MessageSquare,
  ReceiptText,
  ShoppingBag,
  SquareArrowUpRight,
  Users,
  Warehouse,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Oversigter",
    items: [
      {
        title: "Standard",
        url: "/dashboard/default",
        icon: LayoutDashboard,
      },
      {
        title: "CRM",
        url: "/dashboard/crm",
        icon: ChartBar,
      },
      {
        title: "Finans",
        url: "/dashboard/finance",
        icon: Banknote,
      },
      {
        title: "Analyse",
        url: "/dashboard/analytics",
        icon: Gauge,
      },
      // {
      //   title: "Productivity",
      //   url: "/dashboard/productivity",
      //   icon: Kanban,
      // },
      {
        title: "E-handel",
        url: "/dashboard/coming-soon",
        icon: ShoppingBag,
        comingSoon: true,
      },
      {
        title: "Akademi",
        url: "/dashboard/coming-soon",
        icon: GraduationCap,
        comingSoon: true,
      },
      {
        title: "Logistik",
        url: "/dashboard/coming-soon",
        icon: Forklift,
        comingSoon: true,
      },
    ],
  },
  {
    id: 2,
    label: "Sider",
    items: [
      {
        title: "E-mail",
        url: "/dashboard/coming-soon",
        icon: Mail,
        comingSoon: true,
      },
      {
        title: "Elementer",
        url: "/dashboard/elements",
        icon: Database,
      },
      {
        title: "Varelager",
        url: "/dashboard/varelager",
        icon: Warehouse,
      },
      {
        title: "Chat",
        url: "/dashboard/coming-soon",
        icon: MessageSquare,
        comingSoon: true,
      },
      {
        title: "Kalender",
        url: "/dashboard/coming-soon",
        icon: Calendar,
        comingSoon: true,
      },
      {
        title: "Kanban",
        url: "/dashboard/coming-soon",
        icon: Kanban,
        comingSoon: true,
      },
      {
        title: "Faktura",
        url: "/dashboard/coming-soon",
        icon: ReceiptText,
        comingSoon: true,
      },
      {
        title: "Brugere",
        url: "/dashboard/coming-soon",
        icon: Users,
        comingSoon: true,
      },
      {
        title: "Roller",
        url: "/dashboard/coming-soon",
        icon: Lock,
        comingSoon: true,
      },
      {
        title: "Godkendelse",
        url: "/auth",
        icon: Fingerprint,
        subItems: [
          { title: "Log ind v1", url: "/auth/v1/login", newTab: true },
          { title: "Log ind v2", url: "/auth/v2/login", newTab: true },
          { title: "Registrer v1", url: "/auth/v1/register", newTab: true },
          { title: "Registrer v2", url: "/auth/v2/register", newTab: true },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Aeldre",
    items: [
      {
        title: "Oversigter",
        url: "/dashboard/default-v1",
        subItems: [{ title: "Standard V1", url: "/dashboard/default-v1" }],
      },
    ],
  },
  {
    id: 4,
    label: "Diverse",
    items: [
      {
        title: "Andet",
        url: "/dashboard/coming-soon",
        icon: SquareArrowUpRight,
        comingSoon: true,
      },
    ],
  },
];
