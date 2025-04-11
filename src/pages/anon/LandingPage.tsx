import { AuthNavigationButton } from "../../components/Elements/Button/AuthNavigationButton.tsx";

export default function LandingPage() {
  return (
    <>
      <div className={"text-black dark:text-white dark:bg-black"}>Test</div>
      <button
        id="toggleDark"
        onClick={() => document.body.classList.toggle("dark")}
      >
        Toggle Dark Mode
      </button>
      <AuthNavigationButton
        text="Register"
        color="text-white dark:text-black"
        bgColor="bg-black dark:bg-white"
      />

      <AuthNavigationButton
        text="Login"
        color="text-black dark:text-white"
        bgColor="bg-white dark:bg-black"
      />
    </>
  );
}
