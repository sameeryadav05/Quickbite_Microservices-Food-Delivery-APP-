import axios from "axios";
import React, { createContext , useEffect, useState } from "react";
import { AuthService } from "../main";


// ── Types ────────────────────────────────────────────────────────────────────

interface User {
  id: string;
  email: string;
  image: string;
  name: string;
  role: string | null;
}

interface LocationData {
  latitude:number,
  longitude:number,
  formattedAddress:string
}

export interface AppContextType {
  isAuth: boolean;
  Loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser:React.Dispatch<React.SetStateAction<User | null>>;
  City:string|null;
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

// ── Context ──────────────────────────────────────────────────────────────────

export const AppContext = createContext<AppContextType | null>(null);



// ── Provider ─────────────────────────────────────────────────────────────────

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [Loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [Location,setLocation]= useState<LocationData | null>(null);
  const [LoadingLocation,setLoadingLocation] = useState<boolean>(false);
  const [City,setCity] = useState<string>('Fetching Location...')


  const isAuth = !!user;

  async function fetchUser() {
    try {
      setLoading(true);
      const token = localStorage.getItem("Quickbite");
      const { data } = await axios.get(`${AuthService}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data.user);
    } catch (error: any) {
      setUser(null);
      const message = error?.response?.data?.message ?? "Something went wrong";
      console.error(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ isAuth, Loading, setLoading, user ,setUser,setCity,City}}>
      {children}
    </AppContext.Provider>
  );
};

export default React.memo(AppContextProvider);