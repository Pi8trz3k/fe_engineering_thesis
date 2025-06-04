import { UseAuth } from "@/hooks/useAuth.tsx";
import main_graphic from "@/assets/main-graphic.svg";

export default function LandingPage() {
  const { role } = UseAuth();

  const func = () => {
    return (
      <>
        {role === "user" && <div>User się zalogował</div>}
        {role === "trainer" && <div>Trener się zalogował</div>}
      </>
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-[80%] mx-auto mt-8 pt-6">
      <div className="md:w-1/2 w-full text-left  md:ml-10 ml-15 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Bądź fit razem z nami
          <br />
          <span className="text-green-600">Zawsze</span>
        </h1>
      </div>

      <div className="md:w-1/2 w-full flex justify-center">
        <img
          src={main_graphic}
          alt="Zdjęcie fitness"
          className="rounded-xl w-full max-w-md"
        />
      </div>
      {func()}
    </div>
  );
}
