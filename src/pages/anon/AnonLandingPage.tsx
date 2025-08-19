import main_graphic from "@/assets/main-graphic.svg";

const userAndTrainerStyle =
  "md:w-[45%] w-[80%] border-2 border-green-600 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-lg";
const h2Style =
  "text-xl text-green-700 dark:text-green-400 font-semibold mb-4 text-center";
const ulStyle = "dark:text-white list-disc list-inside space-y-2";

export default function AnonLandingPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-[80%] mx-auto mt-15 md:mt-25 pt-6">
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
      </div>

      <div className="text-center mt-20 md:mt-35 text-green-600 dark:text-white text-2xl md:text-3xl font-extrabold">
        Poznaj nasze możliwości!
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-[80%] mx-auto mt-12 gap-8 px-4">
        <div className={userAndTrainerStyle}>
          <h2 className={h2Style}>Użytkownik prywatny</h2>
          <ul className={ulStyle}>
            <li>Wyszukiwarka trenerów</li>
            <li>Współprace z treneremi</li>
            <li>Tworzenie własnych planów treningowych</li>
            <li>Rejestracja wykonanych ćwiczeń</li>
            <li>Śledzenie osiągnięć</li>
          </ul>
        </div>

        <div className={userAndTrainerStyle}>
          <h2 className={h2Style}>Trener</h2>
          <ul className={ulStyle}>
            <li>Tworzenie własnych planów treningowych</li>
            <li>Śledzenie osiągnięć</li>
            <li>Wspólprace z podopiecznymi</li>
            <li>Tworzenie planów dla podopiecznych</li>
            <li>Monitoring postępów podopiecznych</li>
          </ul>
        </div>
      </div>
    </>
  );
}
