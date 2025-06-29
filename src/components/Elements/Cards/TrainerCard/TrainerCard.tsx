import image from "@/pages/user/image.jpg";
import { TrainerCardProps } from "@/pages/DataTypes/TrainersPageTypes.ts";

export default function TrainerCard({
  name,
  lastName,
  meanOfStars,
  opinionsCount,
  locations,
  types,
}: TrainerCardProps) {
  const getTypes = () => {
    let text = "Specjalizacje: ";
    if (types.length > 0) {
      for (let i = 0; i < types.length; i++) {
        text = text + types[i];
        if (i == types.length - 1) {
          text = text + ".";
        } else {
          text = text + ", ";
        }
      }
      return text;
    } else {
      return;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-4 transition-transform hover:scale-105">
      <img
        src={image}
        alt="trener image"
        className="rounded-xl h-40 w-full object-cover"
      />
      <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
        {name} {lastName}
      </h3>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {[...new Set(locations.map((loc) => loc.city))].join(", ")}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">{getTypes()}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-green-600 dark:text-green-400 text-sm">
          {opinionsCount
            ? `⭐ ${meanOfStars} (Opinie: ${opinionsCount})`
            : `Brak opinii`}
        </span>
        <button className="text-sm text-white bg-green-500 px-3 py-1 rounded hover:bg-green-600">
          Zobacz profil
        </button>
      </div>
    </div>
  );
}
