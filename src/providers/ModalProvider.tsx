import { ReactNode, useEffect } from "react";

export default function ModalProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    console.log("ModalProvider");
  }, []);

  return <>{children}</>;
}
