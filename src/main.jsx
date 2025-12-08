import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Routes/Router.jsx";
import AuthProvider from "./Context/AuthProvider/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // <-- MUST CREATE INSTANCE

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
