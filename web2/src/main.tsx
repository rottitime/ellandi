import React, { ReactNode, Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Navigate,
  useLocation,
  useRoutes,
} from "react-router-dom";
import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { SWRConfig } from "swr";
import { BaseProvider } from "baseui";
import { theme, primitives } from "_/theme";
import { EmptyLayout, MenuLayout } from "_/components/Layouts";
import { Spinner } from "baseui/spinner";
import routes from "~react-pages";
import "_/styles/reset.css";
// import "_/styles/tags.css";
// import "_/styles/typography.css";
// import "_/styles/spacing-defaults.css";
// import "_/styles/spacing-scale.css";
// import "_/styles/custom.css";

// Make baseweb primitives available as CSS properties
const styleEl = document.createElement("style");
let customPropertiesCSS = "";
for (const [k, v] of Object.entries(primitives)) {
  customPropertiesCSS += `--${k}:${v};`;
}
styleEl.innerHTML = `:root{${customPropertiesCSS}}`;
document.head.append(styleEl);

// Initialise and attach React app to DOM
const engine = new Styletron();

// Loading indicator (that only appears after 2s, to minimise loading time perception)
const LoadingIndicator = () => {
  const [isLoadingIndicatorVisible, setIsLoadingIndicatorVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoadingIndicatorVisible(true);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return isLoadingIndicatorVisible ? <Spinner $size={100} /> : null;
};

const AppWrappers = ({ children }: { children?: ReactNode }) => {
  return (
    // Enables styletron magic
    <StyletronProvider value={engine}>
      {/* Enables baseweb theme logic */}
      <BaseProvider theme={theme}>
        <SWRConfig>
          {/* Opt-out of legacy React nonsense */}
          <React.StrictMode>
            {/* Enables react-router logic */}
            <Router>{children}</Router>
          </React.StrictMode>
        </SWRConfig>
      </BaseProvider>
    </StyletronProvider>
  );
};

const App = () => {
  const location = useLocation();

  return (
    <Suspense
      fallback={
        location.pathname.startsWith("/steps/") ? (
          <EmptyLayout>
            <LoadingIndicator />
          </EmptyLayout>
        ) : (
          <MenuLayout>
            <LoadingIndicator />
          </MenuLayout>
        )
      }
    >
      {useRoutes([
        ...routes,
        {
          path: "*",
          element:
            routes.length === 0 ? (
              <EmptyLayout>
                <h1 style={{ color: "var(--mono600)" }}>Page Not Found</h1>
              </EmptyLayout>
            ) : (
              <Navigate to="/" />
            ),
        },
      ])}
    </Suspense>
  );
};

const rootElement = document.querySelector("#root");

if (rootElement !== null) {
  createRoot(rootElement).render(
    <AppWrappers>
      <App />
    </AppWrappers>
  );
} else {
  throw new Error("Could not find div#root element");
}
