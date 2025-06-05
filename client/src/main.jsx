import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/userContext.jsx";
import BlogProvider from "./context/blogContext.jsx";

createRoot(document.getElementById("root")).render(
  <main className="max-w-4xl mx-auto px-3">
    <UserProvider>
      <BlogProvider>
        <App />
      </BlogProvider>
      <Toaster />
    </UserProvider>
  </main>
);
