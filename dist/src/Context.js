import { jsx as _jsx } from "react/jsx-runtime";
import React, { useContext, useState } from "react";
const defaultVal = {
    name: "",
    setName: () => { },
};
const context = React.createContext(defaultVal);
const { Provider } = context;
export const ContextWrapper = ({ children }) => {
    const [name, setName] = useState(defaultVal.name);
    return _jsx(Provider, { value: { name, setName }, children: children });
};
export const useAppContext = () => useContext(context);
//# sourceMappingURL=Context.js.map