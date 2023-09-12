import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App';
import './index.css';
export function render(url) {
    return ReactDOMServer.renderToString(_jsx(React.StrictMode, { children: _jsx(StaticRouter, { location: url, children: _jsx(App, {}) }) }));
}
//# sourceMappingURL=entry-server.js.map