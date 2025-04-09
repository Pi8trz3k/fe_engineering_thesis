import { ReactNode, useEffect } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    console.log("AuthProvider");
  }, []);

  return <>{children}</>;
}
