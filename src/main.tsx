import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { appStore } from "./store/appStore.tsx";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={appStore}>
    <App />
  </Provider>
);
