import { ReactNode, useEffect } from "react";

export default function FilterProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    console.log("FilterProvider");
  }, []);

  return <>{children}</>;
}
