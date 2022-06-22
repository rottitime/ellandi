import { FC, ReactNode } from "react";
import { Item } from "baseui/side-navigation";
import { ResponsiveNav } from "./ResponsiveNav";
import { BackLink, Link, Page as GovPage, PhaseBanner, TopNav } from "govuk-react";

type Props = {
  children: ReactNode;
  backLink?: boolean;
};

export const Layout: FC<Props> = ({ children, backLink = false }) => {
  return (
    <GovPage
      header={
        <TopNav
          serviceTitle={
            <TopNav.NavLink href="https://example.com" target="new">
              Civil Service Skills &amp; Learning
            </TopNav.NavLink>
          }
        />
      }
      beforeChildren={
        backLink && (
          <>
            <PhaseBanner level="alpha">
              This part of GOV.UK is being rebuilt –{" "}
              <Link href="https://example.com">find out what that means</Link>
            </PhaseBanner>
            <BackLink
              onClick={() => {
                return history.back();
              }}
            >
              Back
            </BackLink>
          </>
        )
      }
    >
      {children}
    </GovPage>
  );
};

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
    <ResponsiveNav width={240} items={MENU_ITEMS}>
      <main className="mh-auto" style={{ maxWidth }}>
        <div className="rm-margin">{children}</div>
      </main>
    </ResponsiveNav>
  );
};
