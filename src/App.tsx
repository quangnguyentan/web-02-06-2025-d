import { Route, RouteObject, Routes, useNavigate } from "react-router-dom";
import routes from "./pages/routes";
import { Suspense } from "react";

import { Toaster } from "react-hot-toast";

function App() {
  type AppRouteObject = RouteObject & {
    role?: string[];
  };
  const filteredRoutes = (routes as AppRouteObject[]).filter((route) => {
    if (!route.role) return true;
    return route.role.includes("user" as string);
  });

  return (
    <Suspense
      fallback={
        <div id="load">
          <div>G</div>
          <div>N</div>
          <div>I</div>
          <div>D</div>
          <div>A</div>
          <div>O</div>
          <div>L</div>
        </div>
      }
    >
      <Routes>
        {filteredRoutes.map((route) => {
          const isAdminRoute = route.role?.includes("admin");
          if (isAdminRoute) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<div className="admin-wrapper">{route.element}</div>}
              />
            );
          }

          return (
            <Route key={route.path} path={route.path} element={route.element}>
              {route.children?.map((childRoute) => (
                <Route
                  key={childRoute.path}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
            </Route>
          );
        })}
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
            fontSize: "0.9rem",
          },
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      />
    </Suspense>
  );
}

export default App;
