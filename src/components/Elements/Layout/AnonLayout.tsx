import { Outlet } from "react-router-dom";

export default function AnonLayout() {
  return (
    <>
      <main className="">
        <Outlet />
      </main>
    </>
  );
}
