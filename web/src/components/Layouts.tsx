import { ReactNode } from "react";
import { Item } from "baseui/side-navigation";
import { ResponsiveNav } from "./ResponsiveNav";

/* Empty Page (No Nav) */
export const EmptyLayout = ({
  children,
  maxWidth = 700,
}: {
  children?: ReactNode;
  maxWidth?: number;
}) => {
  return (
    <main
      className="px"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="mh-auto rm-margin brx px"
        style={{ maxWidth, width: "100%", background: "#fff" }}
      >
        {children}
      </div>
    </main>
  );
};

/* Responsive Nav Page */
const MENU_ITEMS: Item[] = [
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
        title: "Skills to develop",
        itemId: "/skills/develop",
      },
    ],
  },
  { title: "Your details", itemId: "/details" },
  { title: "[debug-menu]", itemId: "/debug" },
];

export const MenuLayout = ({
  children,
  maxWidth = 800,
}: {
  children?: ReactNode;
  maxWidth?: number;
}) => {
  return (
    <ResponsiveNav width={220} items={MENU_ITEMS}>
      <main className="mh-auto" style={{ maxWidth }}>
        <div className="rm-margin">{children}</div>
      </main>
    </ResponsiveNav>
  );
};
