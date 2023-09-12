import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';
const container = document.getElementById('app');
const FullApp = () => (_jsx(React.StrictMode, { children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }));
if (import.meta.hot || !container?.innerText) {
    const root = createRoot(container);
    root.render(_jsx(FullApp, {}));
}
else {
    hydrateRoot(container, _jsx(FullApp, {}));
}
//# sourceMappingURL=entry-client.js.map