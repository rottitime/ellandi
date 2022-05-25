import { ReactNode } from "react";
import { Item } from "baseui/side-navigation";
import { ResponsiveNav } from "./ResponsiveNav";
import { useLocation } from "react-router-dom";

/* Empty Page (No Nav) */
export const EmptyLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="px">
      <div className="mw-copy mh-auto">{children}</div>
    </div>
  );
};

/* Responsive Nav Page */
const MENU_ITEMS_ALL: Item[] = [
  { title: "Home", itemId: "/" },
  {
    title: "Starter",
    itemId: "/starter",
    subNav: [
      {
        title: "Docs",
        itemId: "/starter/docs",
        subNav: [
          {
            title: "Directory Structure",
            itemId: "/starter/docs/structure",
          },
          {
            title: "How-To Mini Guides",
            itemId: "/starter/docs/mini-guides",
          },
          {
            title: "Components Guide",
            itemId: "/starter/docs/components",
          },
          {
            title: "CSS Utilities Guide",
            itemId: "/starter/docs/css-guide",
          },
        ],
      },
      {
        title: "Test Pages",
        itemId: "/starter/test-pages",
        subNav: [
          {
            title: "Basic Tests",
            itemId: "/starter/test-pages/basics",
          },
          {
            title: "Chart.js Test",
            itemId: "/starter/test-pages/chart",
          },
          {
            title: "CSS Defaults Test",
            itemId: "/starter/test-pages/html-test",
          },
        ],
      },
    ],
  },
];

const MENU_ITEMS: Item[] = MENU_ITEMS_ALL.filter(({ itemId }) => {
  return !(itemId ?? "").startsWith("/starter");
});

export const MenuLayout = ({ children }: { children?: ReactNode }) => {
  const location = useLocation();

  return (
    <ResponsiveNav
      title="Ellandi"
      items={location.pathname.startsWith("/starter") ? MENU_ITEMS_ALL : MENU_ITEMS}
    >
      <main className="mw-copy mh-auto">
        <div className="rm-margin">{children}</div>
      </main>
    </ResponsiveNav>
  );
};
