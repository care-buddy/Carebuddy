import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import App from "./App";

// axios 기본 설정 - refreshToken cookie를 주고받기 위함
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
