import { ReactNode, useEffect } from "react";

export default function RefreshProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    console.log("RefreshProvider");
  }, []);

  return <>{children}</>;
}
