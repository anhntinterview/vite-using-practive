import { jsx } from "react/jsx-runtime";
import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
const Home = (props) => {
  return /* @__PURE__ */ jsx("div", { className: "text-lg bold", children: "Hello, I am Home Page" });
};
const defaultVal = {
  name: "",
  setName: () => {
  }
};
const context = React.createContext(defaultVal);
const { Provider } = context;
const ContextWrapper = ({ children }) => {
  const [name, setName] = useState(defaultVal.name);
  return /* @__PURE__ */ jsx(Provider, { value: { name, setName }, children });
};
const App$1 = "";
const App = () => {
  return /* @__PURE__ */ jsx(ContextWrapper, { children: /* @__PURE__ */ jsx(Home, {}) });
};
const index = "";
function render(url) {
  return ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) }) })
  );
}
export {
  render
};
