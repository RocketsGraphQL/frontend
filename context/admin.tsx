import { createContext, useContext, useState, useEffect } from "react";

import Cookies from "js-cookie";
import axios from "axios";

interface AdminContextProps {
    projects: never[]
}

const AppContext = createContext<AdminContextProps | undefined>(undefined);

export function AppWrapper({ children, ...rest }: {
    children: React.ReactNode,
}) {

  const [projects, setProjects] = useState([])
  useEffect(() => {
    const jwt = Cookies.get("jwt");
    const API_URL = `${process.env.NEXT_PUBLIC_ADMIN_URL}/admin-projects`;
    if (
      jwt &&
      typeof jwt !== "undefined"
    ) {
      axios
        .get(API_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((response: any) => {
          console.log(response)
          if (response && response.data) {
            console.log(response);
            setProjects(response.data.Projects)
          }
        });
    }
  }, []);
  const state = { projects };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAdminContext() {
  return useContext(AppContext);
}

export function useAdminState() {
  const state = useContext(AppContext);
  if (state === undefined) {
    throw new Error("useMissionsState must be used within a MissionsProvider");
  }

  return state;
}
