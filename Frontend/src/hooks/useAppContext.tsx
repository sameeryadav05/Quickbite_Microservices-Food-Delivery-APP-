import { useContext } from "react";
import {AppContext} from "../context/AppContext";


export const useAppContext = ()=> {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppContextProvider");
  return ctx;
};

export default useAppContext