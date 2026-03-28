import axios from "axios";
import React, { createContext , useEffect, useState } from "react";
import { AuthService } from "../main";
import toast from 'react-hot-toast'


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
  const [Loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [Location,setLocation]= useState<LocationData | null>(null);
  const [LoadingLocation,setLoadingLocation] = useState<boolean>(false);
  const [City,setCity] = useState<string>('Fetching Location...')


  const token = localStorage.getItem("Quickbite");
  const isAuth = !!token;

async function fetchUser() {
  const token = localStorage.getItem("Quickbite");

  if (!token) {
    setLoading(false);
    return;
  }

  try {
    const response = await axios.get(`${AuthService}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(response);

    setUser(response.data.user);
  } catch (error: any) {
    if(error?.response?.status !== 429)
    {
      setUser(null);
    }

    const message = error?.response?.data?.message || "Something went wrong";

    toast(message,{ 
          style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        }
      }
    );

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