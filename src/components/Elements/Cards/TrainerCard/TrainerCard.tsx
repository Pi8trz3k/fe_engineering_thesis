import image from "@/pages/user/image.jpg";

export default function TrainerCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 transition-transform hover:scale-105">
      <img
        src={image}
        alt="trener image"
        className="rounded-xl h-40 w-full object-cover"
      />
      <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
        Jan Kowalski
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Specjalizacja: Odchudzanie
      </p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-green-600 dark:text-green-400 text-sm">
          ⭐ 4.9 (34 opinie)
        </span>
        <button className="text-sm text-white bg-green-500 px-3 py-1 rounded hover:bg-green-600">
          Zobacz profil
        </button>
      </div>
    </div>
  );
}
