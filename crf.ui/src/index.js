
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { applyPolyfills, defineCustomElements } from "h8k-components/loader";
import registerServiceWorker from "./registerServiceWorker";

// Create React root and render the main App component
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);

// Register service worker for offline support
registerServiceWorker();

// Initialize custom elements from h8k-components
applyPolyfills().then(() => {
    defineCustomElements(window);
});
