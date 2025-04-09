import { ReactNode, useEffect } from "react";

export default function DataProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    console.log("DataProvider");
  }, []);

  return <>{children}</>;
}
