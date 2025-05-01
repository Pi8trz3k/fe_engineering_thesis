import { useAuth } from "@/hooks/useAuth.tsx";

export default function LandingPage() {
  const { role } = useAuth();

  const func = () => {
    return (
      <>
        {role === "user" && <div>User się zalogował</div>}
        {role === "admin" && <div>Admin się zalogował</div>}{" "}
      </>
    );
  };

  return (
    <div>
      <div className={"text-black dark:text-white dark:bg-gray-800"}>Test</div>
      {func()}
    </div>
  );
}
