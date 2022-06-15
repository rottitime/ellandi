import { ReactNode } from "react";
import { Item } from "baseui/side-navigation";
import { ResponsiveNav } from "./ResponsiveNav";
import { useLocation, useNavigate } from "react-router-dom";
import { getPublicURL } from "_/utilities/urls";

const IS_DEMO = import.meta.env.DEV || import.meta.env.VITE_IS_DEMO_MODE === "true";

/* Empty Page (No Nav) */
export const EmptyLayout = ({
  children,
  maxWidth = 520,
}: {
  children?: ReactNode;
  maxWidth?: number;
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <div
          tabIndex={-1}
          onClick={() => {
            if (IS_DEMO) {
              navigate("/");
            }
          }}
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
      <main className="px">
        <div className="mh-auto rm-margin" style={{ maxWidth }}>
          {children}
        </div>
      </main>
    </div>
  );
};

/* Responsive Nav Page */
const MENU_ITEMS_ALL: Item[] = [
  {
    title: "Your skills",
    itemId: "/skills",
    subNav: [
      {
        title: "General skills",
        itemId: "/skills/general",
      },
      {
        title: "Language skills",
        itemId: "/skills/languages",
      },
      {
        title: "Skills you'd like to develop",
        itemId: "/skills/develop",
      },
    ],
  },
  { title: "Your details", itemId: "/details" },
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
  maxWidth = 800,
}: {
  children?: ReactNode;
  maxWidth?: number;
}) => {
  const location = useLocation();

  return (
    <ResponsiveNav
      width={280}
      items={location.pathname.startsWith("/starter") ? MENU_ITEMS_ALL : MENU_ITEMS}
    >
      <main className="mh-auto" style={{ maxWidth }}>
        <div className="rm-margin">{children}</div>
      </main>
    </ResponsiveNav>
  );
};
