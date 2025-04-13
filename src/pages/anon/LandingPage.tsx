import { AuthNavigationButton } from "../../components/Elements/Buttons/AuthNavigationButton/AuthNavigationButton.tsx";
import ThemeToggle from "../../components/Elements/Theme/ThemeToggle.tsx";

export default function LandingPage() {
  return (
    <div>
      <div className={"text-black dark:text-white dark:bg-gray-800"}>Test</div>
      <ThemeToggle />
      <AuthNavigationButton
        text="Register"
        color="text-white dark:text-black"
        bgColor="bg-gray-800 dark:bg-white"
        className={"hover:bg-gray-700 dark:hover:bg-gray-100"}
      />

      <AuthNavigationButton
        text="Login"
        color="text-black dark:text-white"
        bgColor="bg-white dark:bg-gray-800"
        className={"hover:bg-gray-100 dark:hover:bg-gray-700"}
      />
    </div>
  );
}
