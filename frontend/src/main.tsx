import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Warm up Render backend on app load
fetch("https://portfolio-master-l7rq.onrender.com/api/projects?status=active", {
  method: "GET",
  signal: AbortSignal.timeout(30000),
}).catch(() => {});
