import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";
import { localStorageKeys } from "services/localStorage/constant";
import { getLocalStorage } from "services/localStorage/localStorage";

export const ContextDatas = createContext();

const Context = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = getLocalStorage(localStorageKeys.token);
    return token ? jwtDecode(token) : null;
  });
    
  return (
    <ContextDatas.Provider value={{ user }}>{children}</ContextDatas.Provider>
  );
};

export default Context;
