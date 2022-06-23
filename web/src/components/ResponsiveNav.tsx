import { ReactNode, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Item } from "baseui/side-navigation";
import {
  HeaderNavigation,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { Drawer } from "_/components/Drawer";
import { Button } from "_/components/Button";
import { getPublicURL } from "_/utilities/urls";
import { Menu as MenuIcon } from "lucide-react";

const isBigMQ = matchMedia("(min-width: 720px)");

const IS_DEMO = import.meta.env.DEV || import.meta.env.VITE_IS_DEMO_MODE === "true";

const NAV_ITEM_STYLES = {
  background: "transparent",
  color: "var(--mono100)",
};

export const ResponsiveNav = ({
  children,
  items,
  hasDefaultPadding = true,
  width = 240,
}: {
  children?: ReactNode;
  items: Item[];
  width?: number;
  hasDefaultPadding?: boolean;
}) => {
  const containerElRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [isSmall, setIsSmall] = useState(!isBigMQ.matches);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const BODY_WIDTH = 900;

  const mainContentPaddingClass = hasDefaultPadding
    ? `phx brx ${isSmall ? "pv32" : "pvx"}`
    : "";

  useEffect(() => {
    const onChange = () => {
      const isSmall = !isBigMQ.matches;
      setIsSmall(isSmall);

      // close menu when resizing from big->small
      // e.g. if a user opens the mobile menu, resizes to desktop, then
      // resizes back to mobile, they'd expect the mobile menu to be closed
      if (!isSmall) {
        setIsMobileNavOpen(false);
      }
    };
    isBigMQ.addEventListener("change", onChange);
    return () => {
      isBigMQ.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <div
      style={{
        display: isSmall ? "block" : "flex",
        paddingLeft: isSmall ? 0 : width,
      }}
    >
      {isSmall ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 99,
            boxShadow: "rgba(0,0,0,0.16) 0 0 12px",
          }}
        >
          <HeaderNavigation
            overrides={{
              Root: {
                style: {
                  paddingTop: 0,
                  paddingBottom: 0,
                  borderBottomWidth: 0,
                  background: "var(--primary700)",
                  boxShadow: "0 0 8px var(--primary700)",
                },
              },
            }}
          >
            <StyledNavigationList $align="left">
              <div
                tabIndex={-1}
                onClick={() => {
                  navigate(IS_DEMO ? "/" : "/skills");
                }}
                style={{
                  display: "inline-flex",
                  padding: "0 16px",
                }}
              >
                <img
                  src={getPublicURL("images/ellandi.svg")}
                  alt="Ellandi"
                  aria-label="Ellandi"
                  style={{ width: 140 }}
                />
              </div>
            </StyledNavigationList>
            <StyledNavigationList $align="right">
              <StyledNavigationItem>
                <div ref={containerElRef}>
                  <Button
                    shape="square"
                    onClick={() => {
                      setIsMobileNavOpen(true);
                    }}
                    overrides={{
                      BaseButton: {
                        style: {
                          backgroundColor: "var(--primary500)",
                          border: "2px solid var(--primary500)",
                          height: "56px",
                          width: "56px",
                        },
                      },
                    }}
                  >
                    <MenuIcon size={28} />
                  </Button>
                  <Drawer
                    isOpen={isMobileNavOpen}
                    autoFocus
                    onClose={() => {
                      setIsMobileNavOpen(false);
                    }}
                    overrides={{
                      Root: {
                        style: {
                          zIndex: 999,
                        },
                      },
                      DrawerContainer: {
                        style: {
                          width: `${width}px`,
                          background: "var(--primary700)",
                        },
                      },
                      DrawerBody: {
                        style: {
                          marginTop: "56px",
                          marginLeft: 0,
                          marginRight: 0,
                          marginBottom: 0,
                        },
                      },
                    }}
                  >
                    <Navigation
                      items={items}
                      activeItemId={location.pathname}
                      onChange={({ event, item }) => {
                        event.preventDefault();
                        navigate(item.itemId);
                      }}
                      overrides={{
                        NavItem: {
                          style: {
                            ...NAV_ITEM_STYLES,
                            borderLeftWidth: 0,
                          },
                        },
                      }}
                    />
                  </Drawer>
                </div>
              </StyledNavigationItem>
            </StyledNavigationList>
          </HeaderNavigation>
        </div>
      ) : (
        <div
          style={{
            boxSizing: "content-box",
            width,
            height: "100vh",
            position: "fixed",
            zIndex: 998,
            top: 0,
            left: 0,
            paddingLeft: `calc(50vw - ${(width + BODY_WIDTH) / 2}px)`,
            overflowY: "auto",
          }}
        >
          <div className="pvx">
            <div className="mb16 pt4">
              <div
                tabIndex={-1}
                onClick={() => {
                  navigate(IS_DEMO ? "/" : "/skills");
                }}
                style={{
                  display: "inline-block",
                  padding: "24px 28px 24px",
                }}
              >
                <img
                  src={getPublicURL("images/ellandi.svg")}
                  alt="Ellandi"
                  aria-label="Ellandi"
                  style={{ width: 170 }}
                />
              </div>
            </div>
            <Navigation
              items={items}
              activeItemId={location.pathname}
              onChange={({ event, item }) => {
                event.preventDefault();
                navigate(item.itemId);
              }}
              overrides={{
                NavItem: {
                  style: {
                    ...NAV_ITEM_STYLES,
                  },
                },
              }}
            />
          </div>
        </div>
      )}
      <main
        style={{
          flex: "1 0 auto",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          overflowY: "hidden",
          position: "relative",
          minHeight: "100vh",
          paddingTop: 16 + (isSmall ? 56 : 0),
          paddingLeft: 16,
          paddingBottom: 16,
          paddingRight: 16,
        }}
      >
        <div
          className={mainContentPaddingClass}
          style={{
            width: "100%",
            maxWidth: BODY_WIDTH,
            background: "var(--mono100)",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
};
