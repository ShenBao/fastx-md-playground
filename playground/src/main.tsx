import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// React 19 兼容 patch
import '@ant-design/v5-patch-for-react-19';

// global style
import 'antd/dist/reset.css'
import "./index.css";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
