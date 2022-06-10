import { ReactNode } from "react";
import { Item } from "baseui/side-navigation";
import { ResponsiveNav } from "./ResponsiveNav";
import { useLocation } from "react-router-dom";
import { getPublicURL } from "_/utilities/urls";

/* Empty Page (No Nav) */
export const EmptyLayout = ({
  children,
  maxWidth = 520,
}: {
  children?: ReactNode;
  maxWidth?: number;
}) => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            padding: "32px 36px 28px",
            background: "var(--primary)",
            borderRadius: "0 0 36px 36px",
          }}
        >
          <img
            src={getPublicURL("images/ellandi.svg")}
            alt="Ellandi"
            aria-label="Ellandi"
            style={{ width: 200 }}
          />
        </div>
      </div>
      <div className="px">
        <div className="mh-auto" style={{ maxWidth }}>
          {children}
        </div>
      </div>
    </div>
  );
};

/* Responsive Nav Page */
const MENU_ITEMS_ALL: Item[] = [
  { title: "Profile", itemId: "/panel/profile" },
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

export const MenuLayout = ({
  children,
  maxWidth = 520,
}: {
  children?: ReactNode;
  maxWidth?: number;
}) => {
  const location = useLocation();

  return (
    <ResponsiveNav
      title="Ellandi"
      items={location.pathname.startsWith("/starter") ? MENU_ITEMS_ALL : MENU_ITEMS}
    >
      <main className="mh-auto" style={{ maxWidth }}>
        <div className="rm-margin">{children}</div>
      </main>
    </ResponsiveNav>
  );
};
