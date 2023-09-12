import { jsx as _jsx } from "react/jsx-runtime";
import Home from './client/pages/home';
import { ContextWrapper } from './Context';
import './App.css';
export const App = () => {
    return (_jsx(ContextWrapper, { children: _jsx(Home, {}) }));
};
export default App;
//# sourceMappingURL=App.js.map