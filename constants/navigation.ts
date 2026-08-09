// constants\navigation.ts

export type NavigationItem = {
  href: string;
  label: string;
};

export const navigation: NavigationItem[] = [
  {
    href: "/catalog",
    label: "Наші сукні",
  },
  {
    href: "/#about",
    label: "Про нас",
  },
  {
    href: "/#popular",
    label: "Популярні",
  },
  {
    href: "/#faq",
    label: "Часті питання",
  },
  {
    href: "/#feedback",
    label: "Відгуки",
  },
  {
    href: "/#contacts",
    label: "Контакти",
  },
];
